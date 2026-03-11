import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { ClassCell } from '../../service/hour.class';
import { TableService } from '../../service/table.service';
import { HourService } from '../../service/Adds/addHour.service';
import { ProfesorService } from '../../service/Adds/addProfesor.service';
import { AuthService } from '../../service/auth.service';

type AdminRow = { hora: string; clases: ClassCell[][] };

interface SlotDraft {
  dia: number;
  diaNombre: string;
  hora: string;
  className: string;
  profesorName: string;
  profesorName2: string;
}

@Component({
  selector: 'admin-slot',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, MenuAdminComponent],
  templateUrl: './admin-slot.component.html',
  styleUrl: './admin-slot.component.css'
})
export class AdminComponent implements OnInit {

  scheduleDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  rows: AdminRow[] = [];
  expandedRows: Map<number, (ClassCell | null)[][]> = new Map();
  isGridLoading = false;

  clases: string[] = [];
  profesores: string[] = [];

  draft: SlotDraft | null = null;
  isSaving = false;

  showNewHoraInput = false;
  newHoraValue = '';

  constructor(
    private tableService: TableService,
    private hourService: HourService,
    private profesorService: ProfesorService,
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadGrid(), this.loadOptions()]);
  }

  // ── Carga ──────────────────────────────────────────────

  async loadGrid(): Promise<void> {
    this.isGridLoading = true;
    try {
      this.rows = await this.tableService.getRows();
      this.precalc();
    } catch (e) {
      console.error(e);
    } finally {
      this.isGridLoading = false;
    }
  }

  async loadOptions(): Promise<void> {
    try {
      [this.clases, this.profesores] = await Promise.all([
        this.hourService.getAllClassNames(),
        this.profesorService.getAllProfesorsNames()
      ]);
    } catch (e) { console.error(e); }
  }

  private precalc(): void {
    this.expandedRows.clear();
    this.rows.forEach((row, idx) => {
      const height = Math.max(1, ...row.clases.map(c => c.length || 0));
      this.expandedRows.set(idx, Array.from({ length: height }, (_, i) =>
        row.clases.map(col => col[i] ?? null)
      ));
    });
  }

  // ── Grid helpers ───────────────────────────────────────

  getExpandedRows(idx: number): (ClassCell | null)[][] {
    return this.expandedRows.get(idx) ?? [];
  }

  // ── Helper: primer segundo libre para un día+hora ──────

  private async findNextAvailableSlot(horaBase: string, dia: number): Promise<string> {
    let hora = horaBase;
    for (let i = 0; i < 10; i++) {
      const existente = await this.hourService.checkSlot(hora, dia);
      if (!existente) return hora;

      const [hh, mm, ss] = hora.split(':').map(Number);
      hora = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String((ss ?? 0) + 1).padStart(2, '0')}`;
    }
    return hora;
  }

  // ── Abrir panel desde celda vacía (día ya conocido) ────

  async openAddPanel(rowIdx: number, diaIdx: number): Promise<void> {
    const row = this.rows[rowIdx];
    const horaBase = row.hora + ':00';
    const dia = diaIdx + 1;
    const horaDisponible = await this.findNextAvailableSlot(horaBase, dia);

    this.draft = {
      dia,
      diaNombre: this.scheduleDias[diaIdx],
      hora: horaDisponible,
      className: this.clases[0] ?? '',
      profesorName: this.profesores[0] ?? '',
      profesorName2: ''
    };
  }

  // ── Abrir panel desde botón "+" de la columna hora ────

  async openAddPanelByHora(rowIdx: number): Promise<void> {
    const row = this.rows[rowIdx];
    const horaBase = row.hora + ':00';
    const dia = 1;
    const horaDisponible = await this.findNextAvailableSlot(horaBase, dia);

    this.draft = {
      dia,
      diaNombre: this.scheduleDias[0],
      hora: horaDisponible,
      className: this.clases[0] ?? '',
      profesorName: this.profesores[0] ?? '',
      profesorName2: ''
    };
  }

  closeDraft(): void {
    this.draft = null;
  }

  // ── Confirmar agregar slot ─────────────────────────────

  async confirmAdd(): Promise<void> {
    if (!this.draft) return;
    const { dia, hora, className, profesorName, profesorName2 } = this.draft;

    // Verificación final por si el admin cambió día/hora manualmente
    const existente = await this.hourService.checkSlot(hora, dia);
    if (existente) {
      alert(
        `Ya existe "${existente.nombre_clase}" el ${this.scheduleDias[dia - 1]} a las ${hora}.\n` +
        `Cambiá el horario manualmente.`
      );
      return;
    }

    this.isSaving = true;
    try {
      await this.hourService.addSchedule(className, hora, dia, profesorName, profesorName2);
      alert(`✅ Slot agregado en ${hora}`);
      this.closeDraft();
      await this.tableService.refresh();
      await this.loadGrid();
    } catch (e) {
      alert('❌ Error al agregar');
    } finally {
      this.isSaving = false;
    }
  }

  // ── Eliminar slot ──────────────────────────────────────

  async deleteCell(event: MouseEvent, cell: ClassCell): Promise<void> {
    event.stopPropagation();
    const hora = cell.time ?? '';
    const diaTxt = this.scheduleDias[(cell.day ?? 1) - 1];
    const ok = confirm(`¿Eliminar "${cell.name}" (${diaTxt} ${hora})?`);
    if (!ok) return;
    try {
      await this.hourService.deleteSchedule(cell.name!, hora, cell.day!);
      await this.tableService.refresh();
      await this.loadGrid();
    } catch (e) {
      alert('❌ Error al eliminar');
    }
  }

  // ── Nueva hora manual ──────────────────────────────────

  addNewHoraRow(): void {
    if (!this.newHoraValue.trim()) return;
    this.draft = {
      dia: 1,
      diaNombre: this.scheduleDias[0],
      hora: this.newHoraValue.trim(),
      className: this.clases[0] ?? '',
      profesorName: this.profesores[0] ?? '',
      profesorName2: ''
    };
    this.showNewHoraInput = false;
    this.newHoraValue = '';
  }

  async logOut(): Promise<void> {
    await this.auth.logout().catch(() => {});
    this.router.navigate(['/inicio']);
  }
  // ── Clic en celda ocupada: abre panel con día+hora+siguiente segundo libre ──
  async addSibling(event: MouseEvent, cell: ClassCell): Promise<void> {
    event.stopPropagation();
    const horaBase = cell.time ?? '00:00:00';
    const dia = cell.day ?? 1;
    const horaDisponible = await this.findNextAvailableSlot(horaBase, dia);

    this.draft = {
      dia,
      diaNombre: this.scheduleDias[dia - 1],
      hora: horaDisponible,
      className: this.clases[0] ?? '',
      profesorName: this.profesores[0] ?? '',
      profesorName2: ''
    };
  }
}
  


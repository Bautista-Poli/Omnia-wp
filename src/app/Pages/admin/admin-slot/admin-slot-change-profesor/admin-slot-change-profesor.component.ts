import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuAdminComponent } from '../../menu-admin/menu-admin.component';
import { ClassCell } from '../../../service/hour.class';
import { TableService } from '../../../service/table.service';
import { ProfesorListItem } from '../../admin-profesores/admin-profesor-eliminar/admin-profesor-agregar.component';
import { ProfesorService } from '../../../service/Adds/addProfesor.service';
import { ProfesorSlotSetterService } from '../../../service/setProfesorToSlot.service';

type AdminRow = { hora: string; clases: ClassCell[][] };

@Component({
  selector: 'app-admin-slot-change-profesor',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, MenuAdminComponent],
  templateUrl: './admin-slot-change-profesor.component.html',
  styleUrl: './admin-slot-change-profesor.component.css'
})
export class AdminSlotChangeProfesorComponent implements OnInit {

  scheduleDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  rows: AdminRow[] = [];
  profesores: ProfesorListItem[] = [];
  expandedRows: Map<number, (ClassCell | null)[][]> = new Map();

  isGridLoading = false;
  isSaving = false;

  editingCell: ClassCell | null = null;
  selectedProfesorId: number | null = null;
  selectedProfesor2Id: number | null = null;

  constructor(
    private tableService: TableService,
    private profesorService: ProfesorService,
    private slotSetter: ProfesorSlotSetterService
  ) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadGrid(), this.loadProfesores()]);
  }

  // ── Data loading ──────────────────────────────────────────────────────────────

  async loadGrid(): Promise<void> {
    this.isGridLoading = true;
    try {
      this.rows = await this.tableService.getRows();
      this.precalcExpandedRows();
    } catch (e) {
      console.error('Error cargando grilla', e);
    } finally {
      this.isGridLoading = false;
    }
  }

  async loadProfesores(): Promise<void> {
    try {
      this.profesores = await this.profesorService.getAllProfesors();
    } catch (e) {
      console.error('Error cargando profesores', e);
    }
  }

  // ── Grid helpers ──────────────────────────────────────────────────────────────

  private precalcExpandedRows(): void {
    this.expandedRows.clear();
    this.rows.forEach((row, idx) => {
      const height = Math.max(1, ...row.clases.map(col => col.length || 0));
      const subRows = Array.from({ length: height }, (_, i) =>
        row.clases.map(col => col[i] ?? null)
      );
      this.expandedRows.set(idx, subRows);  // 👈 índice en vez de hora
    });
  }

  getProfesorNombre(profesorId: number | null): string {
    if (profesorId === null) return '—';
    return this.profesores.find(p => p.id === profesorId)?.nombre ?? '—';
  }

  // ── Edit flow ─────────────────────────────────────────────────────────────────

  openEdit(cell: ClassCell): void {
    this.editingCell = cell;
    this.selectedProfesorId = cell.profesorId ?? null;
    this.selectedProfesor2Id = null;
  }

  cancelEdit(): void {
    this.editingCell = null;
    this.selectedProfesorId = null;
    this.selectedProfesor2Id = null;
  }

  async confirmChange(): Promise<void> {
    if (!this.editingCell) return;

    const cell = this.editingCell;
    const prof1 = this.profesores.find(p => p.id === this.selectedProfesorId);
    const prof2 = this.profesores.find(p => p.id === this.selectedProfesor2Id);

    const diaTxt = this.scheduleDias[(cell.day ?? 1) - 1];
    const resumen = `"${cell.name}" — ${diaTxt} ${cell.time?.slice(0, 5)}`;
    const ok = confirm(
      `¿Actualizar profesores de ${resumen}?\n` +
      `Profesor 1: ${prof1?.nombre ?? '(ninguno)'}\n` +
      `Profesor 2: ${prof2?.nombre ?? '(ninguno)'}`
    );
    if (!ok) return;

    this.isSaving = true;
    try {
      await this.slotSetter.setProfesorToSlot(
        cell.name!,
        cell.time!,
        cell.day!,
        prof1?.nombre ?? '',
        prof2?.nombre ?? ''
      );
      alert('✅ Profesores actualizados');
      this.cancelEdit();
      await this.tableService.refresh();
      await this.loadGrid();
    } catch (e) {
      console.error('Error actualizando profesores', e);
      alert('❌ Error al actualizar');
    } finally {
      this.isSaving = false;
    }
  }
}
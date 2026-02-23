import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HourService } from '../../../service/Adds/addHour.service';
import { MenuAdminComponent } from '../../menu-admin/menu-admin.component';

type SlotCell = null | { id: number; nombre_clase: string; horario: string; dia_semana: number };


@Component({
  selector: 'admin-slot-grid',
  standalone: true,
  imports: [NgIf, NgFor, MenuAdminComponent],
  templateUrl: './admin-slot-grid.component.html',
  styleUrl: './admin-slot-grid.component.css'
})
export class AdminSlotGridComponent implements OnInit {

  scheduleHoras: string[] = ['09:00:00','10:00:00','11:00:00','12:00:00','13:00:00','17:00:00','18:00:00','19:00:00','20:00:00'];
  scheduleDias: string[] = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

  adminGrid: SlotCell[][] = [];
  isGridLoading = false;

  constructor(private hourService: HourService) {}

  async ngOnInit(): Promise<void> {
    await this.loadAdminGrid();
  }

  private diaToIdx(diaNumber: number) {
    return diaNumber - 1;
  }

  private horaToIdx(hora: string) {
    return this.scheduleHoras.indexOf(hora);
  }

  async loadAdminGrid() {
    this.isGridLoading = true;
    this.adminGrid = this.scheduleHoras.map(() => this.scheduleDias.map(() => null));

    for (let hIdx = 0; hIdx < this.scheduleHoras.length; hIdx++) {
      const hora = this.scheduleHoras[hIdx];

      for (let dIdx = 0; dIdx < this.scheduleDias.length; dIdx++) {
        const diaNumber = dIdx + 1;

        try {
          const existente = await this.hourService.checkSlot(hora, diaNumber);

          if (existente) {
            this.adminGrid[hIdx][dIdx] = {
              id: existente.id,
              nombre_clase: existente.nombre_clase,
              horario: existente.horario,
              dia_semana: existente.dia_semana
            };
          }
        } catch (e) {
          console.error('Error checkSlot', hora, diaNumber, e);
        }
      }
    }

    this.isGridLoading = false;
  }

    async onDeleteFromGrid(event: MouseEvent, cell: SlotCell) {
      event.preventDefault();
      event.stopPropagation();
      if (!cell) return;

      const diaTxt = this.scheduleDias[cell.dia_semana - 1];
      const ok = confirm(`Eliminar "${cell.nombre_clase}" (${diaTxt} ${cell.horario})?`);
      if (!ok) return;

      try {
        await this.hourService.deleteSchedule(cell.nombre_clase, cell.horario, cell.dia_semana);

        const hIdx = this.scheduleHoras.indexOf(cell.horario);
        const dIdx = cell.dia_semana - 1;
        if (hIdx >= 0 && dIdx >= 0) this.adminGrid[hIdx][dIdx] = null;

        alert('✅ Slot eliminado');
      } catch (e) {
        console.error('Error eliminando slot', e);
        alert('❌ Error al eliminar');
      }
    }

}


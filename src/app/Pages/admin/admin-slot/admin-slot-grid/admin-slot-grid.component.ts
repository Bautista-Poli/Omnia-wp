import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HourService } from '../../../service/Adds/addHour.service';
import { MenuAdminComponent } from '../../menu-admin/menu-admin.component';
import { ClassCell } from '../../../service/hour.class';
import { TableService } from '../../../service/table.service';

// Definimos el tipo para que coincida con la estructura de TableService
type AdminRow = { hora: string; clases: ClassCell[][] };

@Component({
  selector: 'admin-slot-grid',
  standalone: true,
  imports: [NgIf, NgFor, MenuAdminComponent],
  templateUrl: './admin-slot-grid.component.html',
  styleUrl: './admin-slot-grid.component.css'
})
export class AdminSlotGridComponent implements OnInit {

  scheduleDias: string[] = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado'];
  rows: AdminRow[] = [];
  isGridLoading = false;

  constructor(
    private hourService: HourService,
    private tableService: TableService // Inyectamos el servicio que ya sabe agrupar
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadAdminGrid();
  }

  async loadAdminGrid() {
    this.isGridLoading = true;
    try {
      // Obtenemos las filas ya procesadas (ej: 19:00:00 y 19:00:01 vendrán en la misma fila)
      this.rows = await this.tableService.getRows();
    } catch (e) {
      console.error('Error cargando grilla admin', e);
    } finally {
      this.isGridLoading = false;
    }
  }

  /**
   * Como una celda puede tener múltiples clases (ej: 19:00 y 19:00:01), 
   * calculamos cuántas sub-filas necesita esta hora específica.
   */
  getExpandedRows(row: AdminRow) {
    const height = Math.max(1, ...row.clases.map(cell => cell.length || 0));
    const subRows = [];
    for (let i = 0; i < height; i++) {
      subRows.push(row.clases.map(cell => cell[i] ?? null));
    }
    return subRows;
  }

  async onDeleteFromGrid(event: MouseEvent, cell: ClassCell | null) {
    event.preventDefault();
    // 1. Guard check para asegurar que 'cell' no es null
    if (!cell || !cell.name || cell.day === undefined) return;

    // 2. Usamos las propiedades correctas de ClassCell. 
    // Si en ClassCell no existe 'start', intenta con 'time' o la propiedad que uses para la hora.
    const horaClase = (cell as any).time || (cell as any).horario || 'N/A';
    
    const diaTxt = this.scheduleDias[cell.day! - 1];
    const ok = confirm(`¿Eliminar "${cell.name}" (${diaTxt} ${horaClase})?`);
    if (!ok) return;

    try {
      // Usamos el operador "!" o aseguramos que los strings no sean null
      await this.hourService.deleteSchedule(cell.name!, horaClase, cell.day!);
      alert('✅ Slot eliminado');
      await this.loadAdminGrid(); 
    } catch (e) {
      console.error('Error eliminando slot', e);
      alert('❌ Error al eliminar');
    }
  }
}


import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { TableService } from '../../service/table.service';
import { ClassCell } from '../../service/hour.class';

@Component({
  selector: 'tabla-de-clases',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './tabla-de-clases.component.html',
  styleUrls: ['./tabla-de-clases.component.css'],
})
export class TablaDeClasesComponent {
  programa = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado'];
  rows: Array<{ hora: string; clases: ClassCell[][] }> = [];

  availableClasses: string[] = [];
  selectedClass: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tableService: TableService
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.rows = await this.tableService.getRows();
      this.availableClasses = this.extractClassNames(this.rows);
    }
  }

  /** Getter que aplica el filtro (si hay) sin mutar los datos originales */
  get displayedRows(): Array<{ hora: string; clases: ClassCell[][] }> {
    if (!this.selectedClass) return this.rows;

    const sel = this.selectedClass.trim().toLowerCase();
    return this.rows.map(r => ({
      hora: r.hora,
      clases: r.clases.map(cell =>
        cell.filter(c => (c.name ?? '').trim().toLowerCase() === sel)
      )
    }));
  }

  /** Alterna el filtro; si volvés a tocar el mismo, se desactiva (muestra todo) */
  toggleFilter(name: string | null) {
    this.selectedClass = (name === this.selectedClass) ? null : name;
  }

  /** Construye el listado único de nombres de clase ordenados alfabéticamente */
  private extractClassNames(rows: Array<{ hora: string; clases: ClassCell[][] }>): string[] {
    const set = new Set<string>();
    for (const r of rows) {
      for (const cell of r.clases) {
        for (const c of cell) {
          if (c?.name) set.add(c.name.trim());
        }
      }
    }
    return Array.from(set).sort((a, b) =>
      a.localeCompare(b, 'es', { sensitivity: 'base' })
    );
  }

  // trackBy
  trackByHora = (_: number, row: {hora:string}) => row.hora;
  trackByIdx  = (i: number) => i;
  trackByClass = (_: number, c: ClassCell) => c.id ?? c.name ?? _;
}


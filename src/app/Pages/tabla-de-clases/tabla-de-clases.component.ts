import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { TableService } from '../service/table.service';
import { ClassCell } from '../service/hour.class';
import { TranslateModule } from '@ngx-translate/core';
import { AnimacionCargaComponent } from './animacion-carga/animacion-carga.component';

type ExpandedRow = { hora: string; clases: (ClassCell | null)[] };

@Component({
  selector: 'tabla-de-clases',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, TranslateModule, AnimacionCargaComponent],
  templateUrl: './tabla-de-clases.component.html',
  styleUrls: ['./tabla-de-clases.component.css'],
})
export class TablaDeClasesComponent implements OnInit {
  programa = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado'];
  isLoading = true;
  rows: Array<{ hora: string; clases: ClassCell[][] }> = [];
  availableClasses: string[] = [];
  selectedClass: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tableService: TableService
  ) {}

  async ngOnInit(): Promise<void> {
    // isPlatformBrowser evita que corra en SSR, pero sí corre en cada navegación
    if (!isPlatformBrowser(this.platformId)) return;

    this.isLoading = true;
    try {
      this.rows = await this.tableService.getRows();
      this.availableClasses = this.extractClassNames(this.rows);
    } catch (error) {
      console.error('Error al cargar las clases:', error);
    } finally {
      this.isLoading = false;
    }
  }

  get displayedRows(): Array<{ hora: string; clases: ClassCell[][] }> {
    if (!this.selectedClass) return this.rows;
    const sel = this.selectedClass.trim().toLowerCase();
    return this.rows.map(r => ({
      hora: r.hora,
      clases: r.clases.map(cell =>
        cell.filter(c => (c?.name ?? '').trim().toLowerCase() === sel)
      )
    }));
  }

  get expandedRows(): ExpandedRow[] {
    return this.displayedRows.map(r => ({
      hora: r.hora,
      clases: r.clases.map(cell => cell[0] ?? null)
    }));
  }

  toggleFilter(name: string | null) {
    this.selectedClass = (name === this.selectedClass) ? null : name;
  }

  private extractClassNames(rows: Array<{ hora: string; clases: ClassCell[][] }>): string[] {
    const set = new Set<string>();
    for (const r of rows)
      for (const cell of r.clases)
        for (const c of cell)
          if (c?.name) set.add(c.name.trim());
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
  }

  trackByRow = (i: number) => i;
  trackByIdx = (i: number) => i;
}
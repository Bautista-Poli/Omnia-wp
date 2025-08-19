import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { TableService } from '../service/table.service';
import { ClassCell } from '../service/hour.class';
import { exportSchedulePdf } from '../service/pdf.utils';

type ExpandedRow = { hora: string; clases: (ClassCell | null)[] };

@Component({
  selector: 'tabla-de-clases',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './tabla-de-clases.component.html',
  styleUrls: ['./tabla-de-clases.component.css'],
})

export class TablaDeClasesComponent implements OnInit {
  programa = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado'];

  // filas base: cada celda (día) puede tener 0..N clases
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

  /** Aplica el filtro sin mutar los datos originales */
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

  /**
   * Expande cada hora en tantas subfilas como clases paralelas haya.
   *  - Cada celda contiene como máximo 1 clase (o null si no hay).
   *  - Si a las 19:00 hay GAP y YOGA en algún día, esa hora aparece 2 veces.
   */
  get expandedRows(): ExpandedRow[] {
    const base = this.displayedRows;
    const out: ExpandedRow[] = [];

    for (const r of base) {
      const height = Math.max(1, ...r.clases.map(cell => cell.length || 0));
      for (let i = 0; i < height; i++) {
        out.push({
          hora: r.hora,
          clases: r.clases.map(cell => cell[i] ?? null)
        });
      }
    }

    // Si querés ocultar filas 100% vacías tras un filtro, descomentá:
    // return out.filter(row => row.clases.some(c => !!c));

    return out;
  }

  /** Alterna el filtro; si volvés a tocar el mismo, se desactiva */
  toggleFilter(name: string | null) {
    this.selectedClass = (name === this.selectedClass) ? null : name;
  }

  /** Lista única de nombres de clase (ordenada) */
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

  // trackBys
  trackByRow = (i: number) => i;     // para expandedRows
  trackByIdx = (i: number) => i;     // para columnas (días)
  //PDF


  @ViewChild('tableEl', { static: false }) private tableEl!: ElementRef<HTMLTableElement>;
  creatingPdf = false;

  async exportToPdf(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.creatingPdf) return;
    this.creatingPdf = true;
    try {
      await exportSchedulePdf(this.tableEl.nativeElement, {
        title: 'Horarios de clases',
        subtitle: this.selectedClass ? `Filtro: ${this.selectedClass}` : undefined,
        filename: 'horarios-gym.pdf',
      });
    } finally {
      this.creatingPdf = false;
    }
  }

}


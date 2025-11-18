import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { TableService } from '../service/table.service';
import { ClassCell } from '../service/hour.class';
import { TranslateModule} from '@ngx-translate/core';
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

  isLoading: boolean = true; 

  rows: Array<{ hora: string; clases: ClassCell[][] }> = [];

  availableClasses: string[] = [];
  selectedClass: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tableService: TableService
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoading = true; // Inicia la carga
      try {
        this.rows = await this.tableService.getRows();
        this.availableClasses = this.extractClassNames(this.rows);
      } catch (error) {
        console.error('Error al cargar las clases:', error);
      } finally {
        this.isLoading = false; // Finaliza la carga
      }
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
   * - Cada celda contiene como máximo 1 clase (o null si no hay).
   * - Si a las 19:00 hay GAP y YOGA en algún día, esa hora aparece 2 veces.
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

    return out;
  }

  toggleFilter(name: string | null) {
    this.selectedClass = (name === this.selectedClass) ? null : name;
  }

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
      // Ruta dentro de /assets (mismo origen, no hay CORS)
      const url = 'assets/HorariosOmnia.pdf';
      // Opción A: disparar descarga directa (rápida y simple)
      const a = document.createElement('a');
      a.href = url;
      a.download = 'horariosOmnia.pdf';  // nombre del archivo al guardar
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      this.creatingPdf = false;
    }
  }
}
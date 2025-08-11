//tabla-de-clases.ts
import { Component, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TableService } from '../../service/table.service';
export interface Class { name: string; id: number; }
export type ClassCell = Class | null;
export type Hours = { [hour: string]: ClassCell[] }; // null cuando no hay clase
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'; 

@Component({
  selector: 'tabla-de-clases',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './tabla-de-clases.component.html',
  styleUrls: ['./tabla-de-clases.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush // recomendable
})

export class TablaDeClasesComponent {
  programa = ['Lunes','Martes','Miércoles','Jueves','Viernes'];
  rows: Array<{ hora: string; clases: Array<{ name: string|null; id: number|null }> }> = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private hourService: TableService
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const schedule = await this.hourService.getAllHours();
      this.rows = Object.entries(schedule).map(([hora, clases]) => ({ hora, clases }));
    }
  }

  trackByHora = (_: number, row: {hora:string}) => row.hora;
  trackByIdx   = (i: number) => i;
}


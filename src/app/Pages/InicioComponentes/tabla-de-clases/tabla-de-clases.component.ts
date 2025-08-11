// tabla-de-clases.component.ts
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
// ...
export class TablaDeClasesComponent {
  programa = ['Lunes','Martes','Miércoles','Jueves','Viernes'];
  rows: Array<{ hora: string; clases: ClassCell[][] }> = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private tableService: TableService
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.rows = await this.tableService.getRows();
    }
  }

  trackByHora = (_: number, row: {hora:string}) => row.hora;
  trackByIdx  = (i: number) => i;

  // para cada clase dentro de la celda (multi-clase)
  trackByClass = (_: number, c: ClassCell) => c.id ?? c.name ?? _;
}

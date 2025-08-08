
import { Component, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HourService } from '../../service/hour.service';
import { Hours } from '../../interface/data.interface';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'; 

@Component({
  selector: 'tabla-de-clases',
  standalone: true,
  imports: [RouterModule,    NgFor,
    NgIf,],
  templateUrl: './tabla-de-clases.component.html',
  styleUrl: './tabla-de-clases.component.css'
})
export class TablaDeClasesComponent {
  programa: Array<string> = ["Lunes","Martes","Miercoles","Jueves","Viernes"];
  horas: Array<string> = [];
  schedule: Hours[] = [];
  objects: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private hourService: HourService
  ) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      await this.initHours();
    }
  }

  private async initHours() {
    this.schedule = await this.hourService.getAllHours();
    this.myFunction();
  }

  descubrir(hora: string): any[] {
    this.objects = [];
    if (this.schedule.length > 0) {
      this.schedule.forEach(item => {
        if (item[hora]) {
          this.objects = item[hora];
        }
      });
    }
    return this.objects;
  }

  myFunction(): void {
    this.horas = [];
    this.schedule.forEach(item => {
      const time = Object.keys(item)[0];
      if (time) this.horas.push(time);
    });
  }

  toObjectKeys(valor:any):string[] { return Object.keys(valor); }
  toNumber(value:string):number { return Number(value); }
  valor():number { return 8; }
}

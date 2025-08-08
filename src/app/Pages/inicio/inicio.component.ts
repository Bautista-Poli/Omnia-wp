// inicio.component.ts
import { Component, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { HourService } from '../service/hour.service';
import { Hours } from '../interface/data.interface';
import {CantidadUsuariosComponent} from '../InicioComponentes/cantidad-usuarios/cantidad-usuarios.component';
import { LinksToAppComponent } from '../InicioComponentes/LinksToApp/install-links-to-app.component';
import { PhotoDisplayerComponent } from '../InicioComponentes/photo-displayer/photo-displayer.component';
import { HeaderComponent } from '../Components/header/header.component';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CantidadUsuariosComponent,
    LinksToAppComponent,
    PhotoDisplayerComponent,
    RouterModule,
    NgFor,
    NgIf,
    CommonModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
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




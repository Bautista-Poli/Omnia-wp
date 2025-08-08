import { Component } from '@angular/core';
import {CantidadUsuariosComponent} from '../InicioComponentes/cantidad-usuarios/cantidad-usuarios.component';
import { LinksToAppComponent } from '../InicioComponentes/LinksToApp/install-links-to-app.component';
import { PhotoDisplayerComponent } from '../InicioComponentes/photo-displayer/photo-displayer.component';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';

import { Hours, Schedule, Class } from '../interface/data.interface';

import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common'; 

import { RouterModule } from '@angular/router';

import { HourService } from '../service/hour.service';



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

  programa: Array<string> = [
    "Lunes","Martes","Miercoles","Jueves","Viernes"
  ]

  
  horas : Array<string> = [];
  schedule: Hours[] = [{}];
  objects: any[]
  constructor(private hourService: HourService){
    this.initHours();
    this.objects = [];
  }

  async initHours() {
    this.schedule = await this.hourService.getAllHours();
    this.myFunction();
  }
  
  descubrir(hora: string): any {
    this.objects= [];

    if(this.schedule.length !== 1){
    this.schedule.forEach(item => {
      // Check if the hour matches the key of the current object
      if (item[hora]) {
        // If matched, add the array of objects to the result
        this.objects = item[hora];
      }
    });
    return this.objects;
  }
    
  }

  toObjectKeys(valor:any):string[]{
    return Object.keys(valor);
  }

  myFunction(): void {
    this.schedule.forEach(item => {
      const time = Object.keys(item)[0];
      this.horas.push(time);
    });
  }
  toNumber(value:string):number{
    return Number(value);
  }

  valor():number{
    return 8;
  }
  
}

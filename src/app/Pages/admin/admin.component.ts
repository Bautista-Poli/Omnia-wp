import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 

import { HourService } from '../service/addHour.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    RouterOutlet,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent{

  dias: string[] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
  clases: string[] = ["Functional","Yoga"]
  username: string = "";
  password: string | null = "";

  newClassName: string = "";
  newClassDate: string = "";
  newClassTime: string = "";
  newClassTime2: string = "";

  constructor(
    private router: Router,
    private auth: AuthService,
    private hourService: HourService 
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.clases = await this.hourService.getAllClassNames(); 
    } catch (err) {
      console.error('Error cargando nombres de clases:', err);
      this.clases = [];
    }
  }


  async logOut() {
    await this.auth.logout().catch(() => {});
    this.router.navigate(['/login']);
  }

  private dayToNumber(day: string): number {
    const i = this.dias.indexOf(day);
    return i +1;
  }


  async addClassInSpecificTime(clase:string,hora:string,dia:number){
    const existente = await this.hourService.checkSlot(hora, dia);
    console.log(hora, dia,existente)
    if (existente) {
      alert(`Ya existe "${existente.nombre_clase}" el ${this.newClassDate} a las ${existente.horario}.`);
      return; 
    }
    try {
      await this.hourService.addSchedule(clase,hora,dia)
    } catch (err) {
      console.error('Error agregando una clase', err);
    }
  }
  
  async addClass(){
    const dia = this.dayToNumber(this.newClassDate)

    this.addClassInSpecificTime(this.newClassName,this.newClassTime,dia)
    if(this.newClassTime2 != ""){
      console.log("Entro en el segundo")
      this.addClassInSpecificTime(this.newClassName,this.newClassTime2,dia)
    }

  }

  async removeClass(){
    const dia = this.dayToNumber(this.newClassDate)
    const existente = await this.hourService.checkSlot(this.newClassTime, dia);

    if (!existente) {
      alert(`No existe la clase especificada en ese horario`);
      return;
    }
    try {
      await this.hourService.deleteSchedule(this.newClassName, this.newClassTime, dia )
    } catch (err) {
      console.error('Error eliminando una clase', err);
    }
  }
  
}
  


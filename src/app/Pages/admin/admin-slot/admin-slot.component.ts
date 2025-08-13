import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 

import { HourService } from '../../service/Adds/addHour.service';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { ProfesorService } from '../../service/Adds/addProfesor.service';

@Component({
  selector: 'admin-slot',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    MatIconModule,
    MenuAdminComponent
  ],
  templateUrl: './admin-slot.component.html',
  styleUrl: './admin-slot.component.css'
})

export class AdminComponent{

  dias: string[] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
  clases: string[] = []
  username: string = "";
  password: string | null = "";

  newClassName: string = "";
  newClassDate: string = "";
  newClassTime: string = "";
  newClassTime2: string = "";
  profesorName: string = "";
  secondProfesorName: string = "";
  profesores: string[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private profesorService : ProfesorService,
    private hourService: HourService 
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.clases = await this.hourService.getAllClassNames(); 
      this.profesores = await this.profesorService.getAllProfesorsNames(); 
    } catch (err) {
      console.error('Error cargando nombres de clases:', err);
      this.clases = [];
    }
  }


  async logOut() {
    await this.auth.logout().catch(() => {});
    this.router.navigate(['/inicio']);
  }

  private dayToNumber(day: string): number {
    const i = this.dias.indexOf(day);
    return i +1;
  }


  async addClassInSpecificTime(clase:string,hora:string,dia:number,profesorName:string){
    const existente = await this.hourService.checkSlot(hora, dia);
    console.log(hora, dia,existente)
    if (existente) {
      alert(`Ya existe "${existente.nombre_clase}" el ${this.newClassDate} a las ${existente.horario}.`);
      return; 
    }
    try {
      await this.hourService.addSchedule(clase, hora, dia, profesorName);
      alert(`Clase "${clase}" agregada correctamente el día ${this.newClassDate} a las ${hora} ✅`);

    } catch (err) {
      alert('Error al conectar con el servidor');
      console.error('Error agregando una clase', err);
    }
  }
  
  async addSlot(){
    const dia = this.dayToNumber(this.newClassDate)

    this.addClassInSpecificTime(this.newClassName,this.newClassTime,dia,this.profesorName)
    if(this.newClassTime2 != ""){
      console.log("Entro en el segundo")
      this.addClassInSpecificTime(this.newClassName,this.newClassTime2,dia,this.profesorName)
    }

  }

  async removeSlot(){
    const dia = this.dayToNumber(this.newClassDate)
    const existente = await this.hourService.checkSlot(this.newClassTime, dia);

    if (!existente) {
      alert(`No existe la clase especificada en ese horario`);
      return;
    }
    try {
      const resp = await this.hourService.deleteSchedule(this.newClassName, this.newClassTime, dia )
      alert('Se realizó exitosamente la eliminación ✅');
    } catch (err) {
      console.error('Error eliminando una clase', err);
    }
    
  }
  
}
  


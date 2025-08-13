import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ProfesorService } from '../../service/Adds/addProfesor.service';
import { HourService } from '../../service/Adds/addHour.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorSlotSetterService } from '../../service/setProfesorToSlot.service';

@Component({
  selector: 'app-admin-setear-profesor',
  standalone: true,
  imports: [MenuAdminComponent,FormsModule,NgFor,MatIconModule],
  templateUrl: './admin-setear-profesor.component.html',
  styleUrl: './admin-setear-profesor.component.css'
})
export class AdminSetearProfesorComponent {
  className: string = "";
  classTime: string = "";
  classDay: string = "";
  profesorName: string = "";
  secondProfesorName: string = "";
  profesores: string[] = [];
  clases: string[] = [];
  dias: string[] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  
  constructor(
      private router: Router,
      private auth: AuthService,
      private profesorService : ProfesorService,
      private hourService: HourService ,
      private profesorSlotSetterService : ProfesorSlotSetterService
    ) {}
  
  async ngOnInit(): Promise<void> {
    try {
      this.profesores = await this.profesorService.getAllProfesorsNames(); 
      this.clases = await this.hourService.getAllClassNames(); 
    } catch (err) {
      console.error('Error cargando nombres de clases o profesores:', err);
      this.profesores = [];
      this.clases = [];
    }
  }

  
  private dayToNumber(day: string): number {
    const i = this.dias.indexOf(day);
    return i +1;
  }

  
    
  async logOut() {
    await this.auth.logout().catch(() => {});
    this.router.navigate(['/iniciar-sesion']);
  }


  async assignProfesorToClass(){
    const dia = this.dayToNumber(this.classDay)
    const existente = await this.hourService.checkSlot(this.classTime, dia);

    if (!existente) {
      alert(`No existe la clase especificada en ese horario`);
      return;
    }
    else if (existente.nombre_clase != this.className) {
      alert(`Esta "${existente.nombre_clase}" en ese horario`);
      return
    }

    try {
      console.log(this.className,this.classTime,dia, this.profesorName, this.secondProfesorName)
      await this.profesorSlotSetterService.setProfesorToSlot(this.className,this.classTime,dia, this.profesorName, this.secondProfesorName)
    } catch (err) {
      console.error('Error cambiando los profesores de la clase', err);
    }
  }

}

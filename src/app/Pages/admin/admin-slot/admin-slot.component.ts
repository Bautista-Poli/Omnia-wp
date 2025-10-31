import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import { HourService } from '../../service/Adds/addHour.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { ProfesorService } from '../../service/Adds/addProfesor.service';

@Component({
  selector: 'admin-slot',
  standalone: true,
  imports: [FormsModule, NgFor, MatIconModule, MenuAdminComponent],
  templateUrl: './admin-slot.component.html',
  styleUrl: './admin-slot.component.css'
})
export class AdminComponent implements OnInit {

  dias: string[] = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  clases: string[] = [];
  username: string = '';
  password: string | null = '';

  newClassName: string = '';
  newClassDate: string = '';   // Día 1 (texto: 'Lunes', etc.)
  newClassDate2: string = '';  // Día 2 (opcional)
  newClassTime: string = '';   // Horario 1 (requerido)
  newClassTime2: string = '';  // Horario 2 (opcional)
  profesorName: string = '';
  secondProfesorName: string = ''; // opcional
  profesores: string[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private profesorService: ProfesorService,
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
    return i >= 0 ? i + 1 : 0; // 1..6, 0 si no válido
  }

  private getProfessorForSecond(): string {
    return this.secondProfesorName?.trim() ? this.secondProfesorName : this.profesorName;
  }

  async addClassInSpecificTime(clase: string, hora: string, dia: number, profesorName: string) {
    const existente = await this.hourService.checkSlot(hora, dia);
    if (existente) {
      alert(`Ya existe "${existente.nombre_clase}" el ${this.newClassDate} a las ${existente.horario}.`);
      return;
    }
    try {
      await this.hourService.addSchedule(clase, hora, dia, profesorName);
      alert(`Clase "${clase}" agregada correctamente el día ${this.dias[dia - 1]} a las ${hora} ✅`);
    } catch (err) {
      alert('Error al conectar con el servidor');
      console.error('Error agregando una clase', err);
    }
  }

  async addSlot() {
    const dia1 = this.dayToNumber(this.newClassDate);
    if (!this.newClassName || !dia1 || !this.newClassTime) {
      alert('Completá al menos: Clase, Día 1 y Horario 1.');
      return;
    }

    const haySegundoDia = !!this.newClassDate2?.trim();
    const haySegundoHorario = !!this.newClassTime2?.trim();

    const dia2 = haySegundoDia ? this.dayToNumber(this.newClassDate2) : dia1;
    if (haySegundoDia && !dia2) {
      alert('El segundo día no es válido.');
      return;
    }

    const prof1 = this.profesorName;
    const prof2 = this.getProfessorForSecond();

    // Construyo las combinaciones según el caso
    type Slot = { dia: number; hora: string; prof: string };
    const slots: Slot[] = [];

    if (haySegundoDia && haySegundoHorario) {
      // Caso 3: 2º día y 2º horario
      slots.push({ dia: dia1, hora: this.newClassTime, prof: prof1 });
      slots.push({ dia: dia2, hora: this.newClassTime2, prof: prof2 });
    } else if (haySegundoDia && !haySegundoHorario) {
      // Caso 2: 2º día, mismo horario
      slots.push({ dia: dia1, hora: this.newClassTime, prof: prof1 });
      slots.push({ dia: dia2, hora: this.newClassTime, prof: prof2 });
    } else if (!haySegundoDia && haySegundoHorario) {
      // Caso 1: mismo día, 2º horario
      slots.push({ dia: dia1, hora: this.newClassTime, prof: prof1 });
      slots.push({ dia: dia1, hora: this.newClassTime2, prof: prof1 });
    } else {
      // Solo un slot
      slots.push({ dia: dia1, hora: this.newClassTime, prof: prof1 });
    }

    // Creo los slots en serie (con await) para respetar validaciones de checkSlot
    for (const s of slots) {
      await this.addClassInSpecificTime(this.newClassName, s.hora, s.dia, s.prof);
    }
  }

  async removeSlot() {
    const dia = this.dayToNumber(this.newClassDate);
    const existente = await this.hourService.checkSlot(this.newClassTime, dia);

    if (!existente) {
      alert('No existe la clase especificada en ese horario');
      return;
    }
    try {
      await this.hourService.deleteSchedule(this.newClassName, this.newClassTime, dia);
      alert('Se realizó exitosamente la eliminación ✅');
    } catch (err) {
      console.error('Error eliminando una clase', err);
    }
  }
}

  


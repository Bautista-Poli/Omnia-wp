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
  newClassDate3: string = '';  // Día 3 (opcional)
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
      alert(`Ya existe "${existente.nombre_clase}" el ${this.dias[dia - 1]} a las ${existente.horario}.`);
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

    const haySegundoDia   = !!this.newClassDate2?.trim();
    const hayTercerDia    = !!this.newClassDate3?.trim();
    const haySegundaHora  = !!this.newClassTime2?.trim();

    const dia2 = haySegundoDia ? this.dayToNumber(this.newClassDate2) : 0;
    const dia3 = hayTercerDia  ? this.dayToNumber(this.newClassDate3) : 0;

    if (haySegundoDia && !dia2) {
      alert('El segundo día no es válido.');
      return;
    }
    if (hayTercerDia && !dia3) {
      alert('El tercer día no es válido.');
      return;
    }

    // Días seleccionados (únicos, válidos)
    const diasSeleccionados = [dia1, dia2, dia3].filter(d => d > 0);
    const diasUnicos = Array.from(new Set(diasSeleccionados)); // evita duplicados

    const prof1 = this.profesorName;
    const prof2 = this.getProfessorForSecond(); // para días que no son el primero

    type Slot = { dia: number; hora: string; prof: string };
    const slots: Slot[] = [];

    diasUnicos.forEach((d, idx) => {
      const prof = idx === 0 ? prof1 : prof2;
      // Hora obligatoria
      slots.push({ dia: d, hora: this.newClassTime,  prof });
      // Hora opcional: si viene, la agregamos también para cada día
      if (haySegundaHora) {
        slots.push({ dia: d, hora: this.newClassTime2, prof });
      }
    });

    // Crear en serie para respetar checkSlot
    for (const s of slots) {
      await this.addClassInSpecificTime(this.newClassName, s.hora, s.dia, s.prof);
    }
  }

  async removeSlot() {
    const dia1 = this.dayToNumber(this.newClassDate);

    // Validaciones mínimas
    if (!this.newClassName || !dia1 || !this.newClassTime) {
      alert('Completá al menos: Clase, Día 1 y Horario 1 para eliminar.');
      return;
    }

    // Parseo días opcionales
    const dias: number[] = [dia1];

    if (this.newClassDate2?.trim()) {
      const d2 = this.dayToNumber(this.newClassDate2);
      if (!d2) {
        alert('El segundo día no es válido.');
        return;
      }
      dias.push(d2);
    }

    if (this.newClassDate3?.trim()) {
      const d3 = this.dayToNumber(this.newClassDate3);
      if (!d3) {
        alert('El tercer día no es válido.');
        return;
      }
      dias.push(d3);
    }

    const diasUnicos = Array.from(new Set(dias));

    // Horas: obligatoria y opcional
    const horas: string[] = [this.newClassTime];
    if (this.newClassTime2?.trim()) {
      horas.push(this.newClassTime2.trim());
    }

    type Target = { dia: number; hora: string };
    const objetivos: Target[] = [];
    for (const d of diasUnicos) {
      for (const h of horas) {
        objetivos.push({ dia: d, hora: h });
      }
    }

    let ok = 0;
    const notFound: Target[] = [];
    const errors: Target[] = [];

    for (const obj of objetivos) {
      try {
        const existente = await this.hourService.checkSlot(obj.hora, obj.dia);

        // Si no hay slot, o es de otra clase, lo marcamos como "no encontrado"
        if (!existente || existente.nombre_clase !== this.newClassName) {
          notFound.push(obj);
          continue;
        }

        await this.hourService.deleteSchedule(this.newClassName, obj.hora, obj.dia);
        ok++;
      } catch (e) {
        console.error('Error eliminando slot', obj, e);
        errors.push(obj);
      }
    }

    // Mensaje consolidado
    const fmt = (t: Target) => `${this.dias[t.dia - 1]} ${t.hora}`;
    let msg = '';

    if (ok > 0) msg += `✅ Eliminados ${ok} slot(s).\n`;
    if (notFound.length) {
      msg += `⚠️ No se encontró(n) (o la clase no coincide) en:\n- ` + notFound.map(fmt).join('\n- ') + '\n';
    }
    if (errors.length) {
      msg += `❌ Errores al eliminar en:\n- ` + errors.map(fmt).join('\n- ') + '\n';
    }
    if (!msg) msg = 'No hubo acciones.';

    alert(msg.trim());
  }

}

  


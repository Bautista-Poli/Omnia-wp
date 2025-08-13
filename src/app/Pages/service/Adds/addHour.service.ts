import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HourService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async getAllClassNames(): Promise<string[]> {
    const url = `${environment.apiUrl}/classes/names`;
    const res = await fetch(url, { credentials: 'include' }); // quitalo si no usás cookies
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data as string[] : [];
  }

  async addSchedule(nombre_clase: string, horario: string, dia_semana: number): Promise<any> {
    console.log(nombre_clase, horario, dia_semana)
    const res = await fetch(`${environment.apiUrl}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_clase, horario, dia_semana })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async deleteSchedule(nombre_clase: string, horario: string, dia_semana: number): Promise<any> {
    console.log(nombre_clase, horario, dia_semana)
    const res = await fetch(`${environment.apiUrl}/schedule`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_clase, horario, dia_semana })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  async checkSlot(horario: string, dia_semana: number): Promise<{ id:number; nombre_clase:string; horario:string; dia_semana:number } | null> {
    const url = `${environment.apiUrl}/schedule/slot?dia_semana=${dia_semana}&horario=${encodeURIComponent(horario)}`;
    const res = await fetch(url);
    if (res.status === 404) return null;        // no hay clase en ese día+horario
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();                           // { id, nombre_clase, horario, dia_semana }
  }

}
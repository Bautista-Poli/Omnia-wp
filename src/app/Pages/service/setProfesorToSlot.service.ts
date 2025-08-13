import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfesorSlotSetterService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async setProfesorToSlot(nombre_clase: string, horario: string, dia_semana: number, nombreProfesor:string, nombreProfesor2:string): Promise<any> {
    const url = `${environment.apiUrl}/schedule/set-profesores`;
    const body = {
      nombre_clase,
      horario,
      dia_semana,
      nombreProfesor,
      nombreProfesor2
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return await response.json();
  }
}
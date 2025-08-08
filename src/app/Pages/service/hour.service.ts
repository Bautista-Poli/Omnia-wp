// hour.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { timeout, retry } from 'rxjs/operators';
import { Class, ClassInfo, Hours } from '../interface/data.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HourService {
  private readonly hours = ["08:00:00","09:00:00","10:00:00","13:00:00","18:00:00","19:00:00","19:00:01","19:00:02","20:00:00"];
  private readonly api = `${environment.apiUrl}/get-schedule`;
  private schedule: Hours[] = [];
  private hydrated = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Estructura base: para cada hora, 5 días con objetos distintos
    this.hours.forEach(h => {
      const emptyClassesArray: Class[] = Array.from({ length: 5 }, () => ({} as Class));
      this.schedule.push({ [h]: emptyClassesArray });
    });
  }

  private async fetchSchedule(): Promise<void> {
    try {
      // Si alguna vez lo llamás desde SSR por error, salí rápido y no pegués a red
      if (isPlatformServer(this.platformId)) return;

      const scheduleData = await firstValueFrom(
        this.http.get<ClassInfo[]>(this.api).pipe(
          timeout(25000),      // 25s para cubrir el cold-start
          retry(1)             // un reintento rápido
        )
      );

      if (scheduleData?.length) {
        scheduleData.forEach(classItem => {
          const hourKey = classItem.horario;
          const dayOfWeek = (classItem.dia_semana ?? 1) - 1; // 0..4
          const hourIndex = this.hours.findIndex(h => h === hourKey);
          if (hourIndex !== -1 && dayOfWeek >= 0 && dayOfWeek < 5) {
            // Asegura que el array para esa hora exista
            const slot = this.schedule[hourIndex][hourKey];
            if (Array.isArray(slot) && slot[dayOfWeek] !== undefined) {
              slot[dayOfWeek] = { name: classItem.nombre_clase, id: classItem.id } as Class;
            }
          }
        });
      }

      this.hydrated = true;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      // Podés dejar hydrated en false para reintentar más tarde si querés
    }
  }

  async getAllHours(): Promise<Hours[]> {
    if (!this.hydrated) {
      await this.fetchSchedule();
    }
    return this.schedule;
  }
}



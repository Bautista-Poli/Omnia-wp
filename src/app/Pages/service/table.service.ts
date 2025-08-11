import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { timeout, retry } from 'rxjs/operators';
import { ClassInfo } from '../interface/data.interface';
import { environment } from '../../../environments/environment';
import { ClassCell } from './class.cell';

@Injectable({ providedIn: 'root' })
export class TableService {
  private readonly hours = [
    '08:00:00', '09:00:00', '10:00:00',
    '13:00:00', '18:00:00', '19:00:00', '19:00:01', '19:00:02', '20:00:00'
  ];

  private readonly api = `${environment.apiUrl}/get-schedule`;
  private schedule: Record<string, ClassCell[]> = {};
  private hydrated = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializa todas las celdas vacías
    this.hours.forEach(hora => {
      this.schedule[hora] = Array.from({ length: 5 }, () => ClassCell.empty());
    });
  }

  private async fetchSchedule(): Promise<void> {
    try {
      if (isPlatformServer(this.platformId)) return;

      const scheduleData = await firstValueFrom(
        this.http.get<ClassInfo[]>(this.api).pipe(
          timeout(25000),
          retry(1)
        )
      );

      if (scheduleData?.length) {
        scheduleData.forEach(classItem => {
          const hourKey = classItem.horario;
          const dayOfWeek = (classItem.dia_semana ?? 1) - 1; // lunes=0
          this.schedule[hourKey][dayOfWeek] = ClassCell.of(classItem.nombre_clase, classItem.id);
        });
      }

      this.hydrated = true;
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }

  async getAllHours(): Promise<Record<string, ClassCell[]>> {
    if (!this.hydrated) {
      await this.fetchSchedule();
    }
    return this.schedule;
  }
}





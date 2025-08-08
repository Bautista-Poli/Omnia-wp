import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Class, ClassInfo, Hours } from '../interface/data.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HourService {
  private list: BehaviorSubject<Hours> = new BehaviorSubject<Hours>({});
  schedule: Hours[] = [];

  hours = ["08:00:00", "09:00:00", "10:00:00", "13:00:00", "18:00:00", "19:00:00", "19:00:01", "19:00:02", "20:00:00"];

  constructor(private http: HttpClient) {
    this.hours.forEach(hour => {
      const emptyClassesArray: Class[] = Array(5).fill({});
      this.schedule.push({ [hour]: emptyClassesArray });
    });
  }

  private async fetchSchedule(): Promise<void> {
    try {
      const scheduleData = await this.http.get<ClassInfo[]>(`${environment.apiUrl}/get-schedule`).toPromise();

      if (scheduleData) {
        scheduleData.forEach(classItem => {
          const hourKey = classItem.horario;
          let dayOfWeek = classItem.dia_semana - 1;
          const hourIndex = this.hours.findIndex(hour => hour === hourKey);

          if (hourIndex !== -1) {
            this.schedule[hourIndex][hourKey][dayOfWeek] = {
              name: classItem.nombre_clase,
              id: classItem.id
            };
          }
        });
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }

  async getAllHours(): Promise<Hours[]> {
    await this.fetchSchedule();
    return this.schedule;
  }
}


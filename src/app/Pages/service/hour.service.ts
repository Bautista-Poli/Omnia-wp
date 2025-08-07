import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {Class, ClassInfo, Hours} from '../interface/data.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HourService {
  //Ordenar los ID
  private list: BehaviorSubject<Hours> = new BehaviorSubject<Hours>({});
  schedule: Hours[] = [];

  // Define the hours for which you want to store the classes
  hours = ["08:00:00", "09:00:00", "10:00:00","13:00:00","18:00:00","19:00:00","19:00:01","19:00:02","20:00:00"];
  constructor(private http: HttpClient) { 
    this.hours.forEach(hour => {
      const emptyClassesArray: Class[] = Array(5).fill({}); 
      this.schedule.push({ [hour]: emptyClassesArray });
    });
  }

  
  private async fetchSchedule(): Promise<void> {
    try {
      const scheduleData = await this.http.get<ClassInfo[]>('http://localhost:3000/get-schedule').toPromise();
      
      if (scheduleData) {
        // Initialize the schedule array with empty arrays for each hour
        
        scheduleData.forEach(classItem => {
          
          const hourKey = classItem.horario; // Assuming format like '08:00:00'
          let dayOfWeek = classItem.dia_semana -1;
          // Find the index of the hour in the schedule array
          const hourIndex = this.hours.findIndex(hour => hour === hourKey);
  
          if (hourIndex !== -1) {
            // Insert the class data into the array at the corresponding position based on dayOfWeek
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
    await this.fetchSchedule(); // Wait for fetchSchedule to complete
    return this.schedule;
  }

  
  
}

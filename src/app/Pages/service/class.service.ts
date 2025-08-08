import { Injectable } from '@angular/core';
import {  Observable, map } from 'rxjs';
import {Class} from '../interface/class.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private list: Observable<Class[]> = this.http.get<Class[]>(`${environment.apiUrl}/get-classesList`);
  private classes: Class[] = [];
  private isInitialized: boolean = false;
  
  constructor(private http: HttpClient) {
    this.list.subscribe(
      (classes: Class[]) => {
        this.classes = classes;
        this.isInitialized = true;
      },
      (error: any) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  async findClassByName(className: string): Promise<Class | null> {
    if (!this.isInitialized) {
      console.log('Classes list is empty or not initialized.');
      await this.waitForInitialization(); // Wait for initialization if not yet initialized
    }

    const foundClass = this.classes.find(cls => cls.name === className);
    return foundClass !== undefined ? foundClass : null;
  }

  private waitForInitialization(): Promise<void> {
    return new Promise<void>((resolve) => {
      const intervalId = setInterval(() => {
        if (this.isInitialized) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100); // Check every 100 milliseconds
    });
  }

}
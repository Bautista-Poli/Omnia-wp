import { Injectable } from '@angular/core';
import {  Observable, map } from 'rxjs';
import { Profesor } from '../interface/profesor.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProfesorService {
  private list: Observable<Profesor[]> = this.http.get<Profesor[]>('http://localhost:3000/get-profesorList');
  private profesor: Profesor[] = [];

  constructor(private http: HttpClient) {
      this.list.subscribe(
          (profesor: Profesor[]) => {
              this.profesor = profesor;
          },
          (error: any) => {
              console.error('Error fetching classes:', error);
          }
      );
  }

  findById(id: number): Profesor[] | null {
    const foundProfessors = this.profesor.filter(p => p.id === id);
    return foundProfessors.length ? foundProfessors : null;
  }
}
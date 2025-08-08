import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../interface/profesor.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private list: Observable<Profesor[]> = this.http.get<Profesor[]>(`${environment.apiUrl}/get-profesorList`);
  private profesor: Profesor[] = [];

  constructor(private http: HttpClient) {
    this.list.subscribe(
      (profesor: Profesor[]) => {
        this.profesor = profesor;
      },
      (error: any) => {
        console.error('Error fetching professors:', error);
      }
    );
  }

  findById(id: number): Profesor[] | null {
    const foundProfessors = this.profesor.filter(p => p.id === id);
    return foundProfessors.length ? foundProfessors : null;
  }
}

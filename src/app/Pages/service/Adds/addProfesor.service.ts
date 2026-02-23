import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../../interface/profesor.interface';
import { environment } from '../../../../environments/environment';

export type ProfesorListItem = { id: number; nombre: string; src: string };

@Injectable({ providedIn: 'root' })
export class ProfesorService {
  constructor(private http: HttpClient) {}

  getProfesorById(id: number): Promise<Profesor> {
    return firstValueFrom(
      this.http.get<Profesor>(`${environment.apiUrl}/profesores/${id}`)
    );
  }

  getAllProfesors(): Promise<ProfesorListItem[]> {
    return firstValueFrom(
      this.http.get<ProfesorListItem[]>(`${environment.apiUrl}/profesores`)
    );
  }

  getAllProfesorsNames(): Promise<string[]> {
    return firstValueFrom(
      this.http.get<string[]>(`${environment.apiUrl}/profesores/names`)
    );
  }

  addProfesor(fd: FormData): Promise<any> {
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/upload-profesor`, fd)
    );
  }

  deleteProfesor(nombre: string): Promise<any> {
    return firstValueFrom(
      this.http.delete(`${environment.apiUrl}/profesores`, {
        body: { nombre }
      })
    );
  }
}

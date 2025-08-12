import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Profesor } from '../interface/profesor.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfesorService {
  constructor(private http: HttpClient) {}

  async getProfesorById(id: number): Promise<Profesor> {
    return await firstValueFrom(
      this.http.get<Profesor>(`${environment.apiUrl}/profesores/${id}`)
    );
  }
}

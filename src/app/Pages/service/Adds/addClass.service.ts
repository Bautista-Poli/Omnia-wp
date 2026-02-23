import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Class } from '../../interface/data.interface';
import { environment } from '../../../../environments/environment.prod';

export type ClaseListItem = { id: number; name: string; src: string };

@Injectable({ providedIn: 'root' })
export class ClassService {
  constructor(private http: HttpClient) {}

  async findClassByName(className: string): Promise<Class | null> {
    const name = encodeURIComponent(className.trim());
    const url = `${environment.apiUrl}/classes/${name}`;

    try {
      return await firstValueFrom(this.http.get<Class>(url));
    } catch (err) {
      if (err instanceof HttpErrorResponse && err.status === 404) return null;
      throw err;
    }
  }

  async getAllClasesNames(): Promise<string[]> {
    return await firstValueFrom(
      this.http.get<string[]>(`${environment.apiUrl}/classes/names`, { withCredentials: true })
    );
  }

  // ✅ NUEVO: lista para cards (id, nombre, src)
  async getAllClases(): Promise<ClaseListItem[]> {
    return await firstValueFrom(
      this.http.get<ClaseListItem[]>(`${environment.apiUrl}/classes`, { withCredentials: true })
    );
  }

  async addClass(fd: FormData): Promise<any> {
    return await firstValueFrom(
      this.http.post(`${environment.apiUrl}/upload-class`, fd, { withCredentials: true })
    );
  }

  // ⚠️ Mantengo tu delete actual (si tu backend realmente usa /class)
  async deleteClassByName(nombre: string): Promise<any> {
    return await firstValueFrom(
      this.http.delete(`${environment.apiUrl}/class`, {
        withCredentials: true,
        body: { nombre }
      })
    );
  }

  // ✅ Recomendado: delete por id (si agregás la ruta)
  async deleteClassById(id: number): Promise<any> {
    return await firstValueFrom(
      this.http.delete(`${environment.apiUrl}/classes/${id}`, { withCredentials: true })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Class } from '../interface/class.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClassService {
  constructor(private http: HttpClient) {}

  async findClassByName(className: string): Promise<Class | null> {
    const name = encodeURIComponent(className.trim());
    const url = `${environment.apiUrl}/classes/${name}`;

    try {
      const cls = await firstValueFrom(this.http.get<Class>(url));
      return cls; // { src, description, profesorId, profesor2Id }
    } catch (err) {
      if (err instanceof HttpErrorResponse && err.status === 404) {
        return null; // no encontrada
      }
      throw err; // otros errores (500, red, etc.)
    }
  }
}



import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfesorService {
constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    async getAllProfesorsNames(): Promise<string[]> {
        const url = `${environment.apiUrl}/profesores/names`;
        const res = await fetch(url, { credentials: 'include' }); // quitalo si no usás cookies
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data as string[] : [];
    }

    async addProfesor(fd: FormData): Promise<any> {
        await fetch(`${environment.apiUrl}/upload-profesor`, {
            method: 'POST',
            body: fd
        });
    }

    async deleteProfesor(nombre:string): Promise<any> {
        const res = await fetch(`${environment.apiUrl}/profesores`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

}
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClassService {
constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    async getAllClasesNames(): Promise<string[]> {
        const url = `${environment.apiUrl}/classes/names`;
        const res = await fetch(url, { credentials: 'include' }); // quitalo si no usás cookies
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data as string[] : [];
    }

    async addClass(fd: any): Promise<any> {
        await fetch(`${environment.apiUrl}/upload-class`, {
            method: 'POST',
            body: fd
        });
        
    }

    async deleteClass(nombre:string): Promise<any> {
        console.log(nombre)
        const res = await fetch(`${environment.apiUrl}/class`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

}
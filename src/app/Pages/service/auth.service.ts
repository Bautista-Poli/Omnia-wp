// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/login`, { username, password }, {
        withCredentials: true, responseType: 'text'
      })
    );
  }

  me() {
    return firstValueFrom(
      this.http.get<{user:string, role:string}>(`${environment.apiUrl}/me`, {
        withCredentials: true
      })
    );
  }

  logout() {
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/logout`, {}, {
        withCredentials: true, responseType: 'text'
      })
    );
  }
}

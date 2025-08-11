// iniciar-sesion.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  username = '';
  password = '';
  show: 'password' | 'text' = 'password';
  loading = false;

  constructor(private router: Router, private auth: AuthService) {}

  async iniciarSesion() {
    if (!this.username || !this.password) return;

    this.loading = true;
    try {
      await this.auth.login(this.username, this.password); // hace POST /login (withCredentials)
      this.router.navigate(['/admin']);                    // ruta protegida por guard
    } catch {
      alert('Usuario o contraseña inválidos');
    } finally {
      this.loading = false;
    }
  }

  showPassword() {
    this.show = this.show === 'password' ? 'text' : 'password';
  }
}


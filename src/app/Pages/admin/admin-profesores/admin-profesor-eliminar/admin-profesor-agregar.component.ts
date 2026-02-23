import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ProfesorService } from '../../../service/Adds/addProfesor.service';
import { MenuAdminComponent } from '../../menu-admin/menu-admin.component';
import { Profesor } from '../../../interface/profesor.interface';

export interface ProfesorListItem {
  id: number;
  nombre: string;
  src: string;
}

@Component({
  selector: 'admin-profesor-delete',
  standalone: true,
  imports: [FormsModule, NgFor, MatIconModule, MenuAdminComponent],
  templateUrl: './admin-profesor-agregar.component.html',
  styleUrl: './admin-profesor-agregar.component.css',
})
export class AdminProfesoresEliminarComponent implements OnInit {
  profesores: ProfesorListItem[] = [];

  loadingList = false;
  deletingId: number | null = null;

  successMsg = '';
  errorMsg = '';

  constructor(private profesorService: ProfesorService) {}

  async ngOnInit(): Promise<void> {
    await this.reloadProfesores();
  }

  async reloadProfesores() {
    this.loadingList = true;
    this.successMsg = '';
    this.errorMsg = '';
    try {
      this.profesores = await this.profesorService.getAllProfesors();
    } catch {
      this.errorMsg = 'Error cargando profesores.';
      setTimeout(() => (this.errorMsg = ''), 3000);
    } finally {
      this.loadingList = false;
    }
  }

  async removeProfesor(p: ProfesorListItem) {
  if (!confirm(`¿Eliminar a "${p.nombre}"?`)) return;

  this.deletingId = p.id;
  this.successMsg = '';
  this.errorMsg = '';

  try {
    await this.profesorService.deleteProfesor(p.nombre);
    this.profesores = this.profesores.filter(x => x.id !== p.id);

    this.successMsg = `"${p.nombre}" eliminado.`;
    setTimeout(() => (this.successMsg = ''), 3000);
  } catch {
    this.errorMsg = 'Error al eliminar el profesor.';
    setTimeout(() => (this.errorMsg = ''), 3000);
  } finally {
    this.deletingId = null;
  }
}


  onImgError(e: Event) {
    const img = e.target as HTMLImageElement;
    img.src = 'assets/user-placeholder.png'; // poné el placeholder que tengas
  }
}


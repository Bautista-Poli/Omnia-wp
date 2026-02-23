import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProfesorService } from '../../../service/Adds/addProfesor.service';
import { MenuAdminComponent } from '../../menu-admin/menu-admin.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-profesores-grid',
  standalone: true,
  imports: [MenuAdminComponent, MatIcon, FormsModule],
  templateUrl: './admin-profesores-grid.component.html',
  styleUrl: './admin-profesores-grid.component.css'
})
export class AdminProfesoresAgregarComponent {
  selectedFile?: File;
  previewUrl?: string;
  newProfesorName = '';

  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(private profesorService: ProfesorService) {}

  private clearMsgs() {
    this.successMsg = '';
    this.errorMsg = '';
  }

  onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async addProfesor() {
    this.clearMsgs();

    const name = this.newProfesorName.trim();
    if (!name || !this.selectedFile) {
      this.errorMsg = 'Completá el nombre y seleccioná una imagen.';
      return;
    }

    this.loading = true;

    const fd = new FormData();
    fd.append('name', name);
    fd.append('photo', this.selectedFile);

    try {
      await this.profesorService.addProfesor(fd);
      this.successMsg = `"${name}" agregado correctamente.`;

      this.newProfesorName = '';
      this.selectedFile = undefined;
      this.previewUrl = undefined;

      setTimeout(() => (this.successMsg = ''), 3000);
    } catch {
      this.errorMsg = 'Error al agregar el profesor.';
      setTimeout(() => (this.errorMsg = ''), 3000);
    } finally {
      this.loading = false;
    }
  }
}

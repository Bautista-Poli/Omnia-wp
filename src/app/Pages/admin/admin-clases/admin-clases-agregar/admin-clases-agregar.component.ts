import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MenuAdminComponent } from '../../menu-admin/menu-admin.component';
import { ClassService } from '../../../service/Adds/addClass.service';

@Component({
  selector: 'admin-clase-agregar',
  standalone: true,
  imports: [FormsModule, NgIf, MatIconModule, MenuAdminComponent],
  templateUrl: './admin-clases-agregar.component.html',
  styleUrl: './admin-clases-agregar.component.css',
})
export class AdminClaseAgregarComponent {
  newClassName = '';
  newClassDescription = '';

  selectedFile?: File;
  previewUrl?: string;

  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(private classService: ClassService) {}

  private clearMsgs() {
    this.successMsg = '';
    this.errorMsg = '';
  }

  onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result as string);
    reader.readAsDataURL(this.selectedFile);
  }

  async addClass() {
    this.clearMsgs();

    const name = this.newClassName.trim();
    const description = this.newClassDescription.trim();

    if (!name || !description || !this.selectedFile) {
      this.errorMsg = 'Completá nombre, descripción y seleccioná una imagen.';
      setTimeout(() => (this.errorMsg = ''), 3000);
      return;
    }

    const fd = new FormData();
    fd.append('name', name);
    fd.append('description', description);
    fd.append('photo', this.selectedFile);

    this.loading = true;
    try {
      await this.classService.addClass(fd);
      this.successMsg = `"${name}" agregada correctamente.`;
      setTimeout(() => (this.successMsg = ''), 3000);

      this.newClassName = '';
      this.newClassDescription = '';
      this.selectedFile = undefined;
      this.previewUrl = undefined;
    } catch (e) {
      this.errorMsg = 'Error al agregar la clase.';
      setTimeout(() => (this.errorMsg = ''), 3000);
    } finally {
      this.loading = false;
    }
  }

  clearImage() {
    this.selectedFile = undefined;
    this.previewUrl = undefined;
  }
}


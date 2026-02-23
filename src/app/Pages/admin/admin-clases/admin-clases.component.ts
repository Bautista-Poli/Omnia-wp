import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ClaseListItem, ClassService } from '../../service/Adds/addClass.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';

@Component({
  selector: 'admin-clases-eliminar',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MenuAdminComponent],
  templateUrl: './admin-clases.component.html',
  styleUrl: './admin-clases.component.css',
})

export class AdminClaseComponent implements OnInit {
  clases: ClaseListItem[] = [];
  loadingList = false;
  deletingId: number | null = null;

  successMsg = '';
  errorMsg = '';

  constructor(private classService: ClassService) {}

  async ngOnInit(): Promise<void> {
    await this.reloadClases();
  }

  async reloadClases() {
    this.loadingList = true;
    this.successMsg = '';
    this.errorMsg = '';
    try {
      this.clases = await this.classService.getAllClases();
    } catch {
      this.errorMsg = 'Error cargando clases.';
      setTimeout(() => (this.errorMsg = ''), 3000);
    } finally {
      this.loadingList = false;
    }
  }

  async removeClase(c: ClaseListItem) {
    if (!confirm(`¿Eliminar "${c.name}"?`)) return;

    this.deletingId = c.id;
    this.successMsg = '';
    this.errorMsg = '';

    try {
      // ✅ si ya agregaste DELETE /classes/:id (ideal)
      await this.classService.deleteClassById(c.id);

      // Si todavía no lo tenés, usá temporalmente:
      // await this.classService.deleteClassByName(c.nombre);

      this.clases = this.clases.filter(x => x.id !== c.id);
      this.successMsg = `"${c.name}" eliminada.`;
      setTimeout(() => (this.successMsg = ''), 3000);
    } catch {
      this.errorMsg = 'Error al eliminar la clase.';
      setTimeout(() => (this.errorMsg = ''), 3000);
    } finally {
      this.deletingId = null;
    }
  }

  onImgError(e: Event) {
    const img = e.target as HTMLImageElement;
    img.src = 'assets/class-placeholder.png';
  }
}


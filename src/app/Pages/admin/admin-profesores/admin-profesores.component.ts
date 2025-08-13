import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 
import { AuthService } from '../../service/auth.service';
import {MatIconModule} from '@angular/material/icon';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { ProfesorService } from '../../service/addProfesor.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    MatIconModule,
    MenuAdminComponent
  ],
  templateUrl: './admin-profesores.component.html',
  styleUrl: './admin-profesores.component.css'
})
export class AdminProfesoresComponent {
  selectedFile?: File;
  newProfesorName: string = "";
  profesores: string[] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
  eliminateProfesor: string = "";
  constructor(
      private router: Router,
      private auth: AuthService,
      private profesorService : ProfesorService,
    ) {}
  
  async ngOnInit(): Promise<void> {
    try {
      this.profesores = await this.profesorService.getAllProfesorsNames(); 
    } catch (err) {
      console.error('Error cargando nombres de clases:', err);
      this.profesores = [];
    }
  }
  

  onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length) this.selectedFile = input.files[0];
  }

  async addProfesor() {
    /*
    if (!this.newProfesorName || !this.selectedFile) return;
    const fd = new FormData();
    fd.append('name', this.newProfesorName);
    fd.append('photo', this.selectedFile);

    await fetch('https://TU_BACKEND_RAILWAY/upload-profesor', {
      method: 'POST',
      body: fd
    });
    */
      // luego refrescás la lista
  }
    
  async logOut() {
    await this.auth.logout().catch(() => {});
    this.router.navigate(['/iniciar-sesion']);
  }


  async removeProfesor(){
    try {
      await this.profesorService.deleteProfesor(this.eliminateProfesor)
    } catch (err) {
      console.error('Error eliminando una clase', err);
    }
  }

}

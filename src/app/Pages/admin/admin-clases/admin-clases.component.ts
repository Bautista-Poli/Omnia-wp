import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 
import { AuthService } from '../../service/auth.service';
import { ClassService } from '../../service/addClass.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfesorService } from '../../service/addProfesor.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    MenuAdminComponent,
    MatIconModule
  ],
  templateUrl: './admin-clases.component.html',
  styleUrl: './admin-clases.component.css'
})
export class AdminClaseComponent {
  selectedFile?: File;
  newClassName: string = "";
  newClassDescription: string = "";
  eliminateClass: string = "";
  profesores: string[] = []
  constructor(
        private router: Router,
        private auth: AuthService,
        private classService: ClassService,
        private profesorService: ProfesorService
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
  
    async addClass() {
      
      if (!this.newClassName || !this.selectedFile) return;
      const fd = new FormData();
      fd.append('name', this.newClassName);
      fd.append('photo', this.selectedFile);
      
      console.log(fd)
      try {
        await this.classService.addClass(fd)
      } catch (err) {
        console.error('Error eliminando una clase', err);
      }
  
        // luego refrescás la lista
    }
      
    async logOut() {
      await this.auth.logout().catch(() => {});
      this.router.navigate(['/iniciar-sesion']);
    }
  
  
    async removeClass(){
    
    console.log(this.eliminateClass)
    try {
      await this.classService.deleteClass(this.eliminateClass)
    } catch (err) {
      console.error('Error eliminando una clase', err);
    }
      
  }

  

}

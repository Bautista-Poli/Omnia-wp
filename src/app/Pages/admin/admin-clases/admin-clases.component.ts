import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 
import { AuthService } from '../../service/auth.service';
import { ClassService } from '../../service/Adds/addClass.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfesorService } from '../../service/Adds/addProfesor.service';

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
  classes: string[] = []
  constructor(
        private router: Router,
        private auth: AuthService,
        private classService: ClassService,
      ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.classes = await this.classService.getAllClasesNames(); 
    } catch (err) {
      console.error('Error cargando nombres de clases:', err);
      this.classes = [];
    }
  }
  
 
    onFile(e: Event) {
      const input = e.target as HTMLInputElement;
      if (input.files?.length) {
        this.selectedFile = input.files[0];
      }
    }

  async addClass() {
    if (!this.newClassName || !this.newClassDescription || !this.selectedFile) {
      alert('Faltan datos');
      return;
    }

    const fd = new FormData();
    fd.append('name', this.newClassName);
    fd.append('description', this.newClassDescription);
    fd.append('photo', this.selectedFile);

    try {
      const res = await this.classService.addClass(fd);

      if (res.ok) {
        alert('Clase agregada correctamente ✅');
        // Opcional: limpiar inputs
        this.newClassName = '';
        this.newClassDescription = '';
        this.selectedFile = undefined;
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.detail || 'No se pudo agregar la clase'}`);
      }
    } catch (err) {
      alert('Error al conectar con el servidor');
      console.error(err);
    }
  }
      
    async logOut() {
      await this.auth.logout().catch(() => {});
      this.router.navigate(['/iniciar-sesion']);
    }
  
  
    async removeClass(){
    
    try {
      const resp = await this.classService.deleteClass(this.eliminateClass)
      if (resp?.ok) {
        alert('Se realizó exitosamente la eliminación');
        // Actualizá la lista local (si la tenés en memoria)
        this.classes = this.classes.filter(n => n !== this.eliminateClass);
        this.eliminateClass = '';
      } else {
        alert('No se pudo eliminar (respuesta inesperada)');
      }
    } catch (err) {
      console.error('Error eliminando una clase', err);
    }
      
  }

  

}

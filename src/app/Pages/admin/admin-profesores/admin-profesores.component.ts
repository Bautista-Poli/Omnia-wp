import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 
import { ClassService } from '../../service/class.service';
import { AuthService } from '../../service/auth.service';
import {MatIconModule} from '@angular/material/icon';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';

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
  newProfesorImage: string = "";
  newProfesorName: string = "";
  profesores: string[] = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
  eliminateProfesor: string = "";
  constructor(
      private router: Router,
      private auth: AuthService,
    ) {}
    
  async logOut() {
    await this.auth.logout().catch(() => {});
    this.router.navigate(['/Login']);
  }

  onFile(evt: Event) {
    const input = evt.target as HTMLInputElement;
    console.log(input)
  }

  async addProfesor(){
    
  }

  async removeProfesor(){
    
  }

}

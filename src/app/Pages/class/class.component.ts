import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common'; 
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { ClassService } from '../service/class.service';
import { Class } from '../interface/class.interface';
import { ProfesorService } from '../service/profesor.service';
import { VideoReproductorComponent } from './video-reproductor/video-reproductor.component';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatCardModule,
    NgIf,
    NgFor,
    VideoReproductorComponent
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent implements OnInit {
  className: string | null = null;
  classData: Class | null = null;  
  nombreProfesor: string | null = null;
  src: string | null = null;
  profId: number | null = null;

  
  constructor(
    private activateRoute: ActivatedRoute,
    private classService: ClassService,
    private profesorService: ProfesorService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.className = this.activateRoute.snapshot.paramMap.get('className');
    const profParam = this.activateRoute.snapshot.queryParamMap.get('profesorId');
    this.profId = profParam !== null ? Number(profParam) : null;

    if (this.className) {
      this.classData = await this.classService.findClassByName(this.className);
      if (this.profId != null) await this.obtenerProfesor(this.profId);
    }
  }

  private async obtenerProfesor(id: number): Promise<void> {
    try {
      const profesor = await this.profesorService.getProfesorById(id);
      this.nombreProfesor = profesor.nombre;
      this.src = profesor.src; 
    } catch (error) {
      console.error('Error al obtener profesor:', error);
    }
  }

  toObjectkey(value: any): string[] {
    return Object.keys(value);
  }
}


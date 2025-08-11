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
import { Profesor } from '../interface/profesor.interface';

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
    NgFor
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent implements OnInit {
  className: string | null;
  class!: Class | null;
  profesores!: Profesor[] | null;

  constructor(private activateRoute: ActivatedRoute, private classService: ClassService, private profesorService: ProfesorService) {
    this.className = "";
  }

  async ngOnInit():Promise<void>{
    this.className = this.activateRoute.snapshot.paramMap.get('id');
    if(this.className != null){
      this.class = await this.classService.findClassByName(this.className);
    }
    if(this.class != null){
      this.profesores = this.profesorService.findById(this.class.profesorid);
    }
    console.log(this.className)
    
  }


  toObjectkey(value:any):string[]{
    return Object.keys(value)
  }
}


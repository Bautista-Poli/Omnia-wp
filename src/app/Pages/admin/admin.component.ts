import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 

import { HourService } from '../service/addHour.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    RouterOutlet,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent{
  hours: string[] = [];

  username: string = "";
  password: string | null = "";

  newClassSrc: string = "";
  newClassName: string = "";
  newClassProfessor: string = "";
  newClassProfessor2: string = "";
  newClassDate: string = "";
  newClassTime: string = "";
  newClassId: number = 0;

  constructor(private router: Router, private auth: AuthService) {}

  async logOut() {
    await this.auth.logout().catch(() => {});
    this.router.navigate(['/login']);
  }

  
  addClass(){
    console.log(this.newClassSrc);
    console.log(this.newClassName);
    console.log(this.newClassDate);
    console.log(this.newClassTime);
    console.log(this.newClassId);

    
  }
  removeClass(){
    
  }
  populateHours() {
    this.hours.push("08:00");
    this.hours.push("09:00");
    this.hours.push("10:00");
    this.hours.push("13:00");
    this.hours.push("18:00");
    this.hours.push("19:00");
    this.hours.push("20:00");
  }
  
}
  


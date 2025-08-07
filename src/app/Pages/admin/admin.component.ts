import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 

import { HourService } from '../service/hour.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

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
export class AdminComponent implements OnInit {
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

  constructor(private router: Router,private hourService:HourService ) {
    this.populateHours();
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (storedUsername && storedPassword) {
            this.username = storedUsername;
            this.password = storedPassword;
        }

        if (!this.checkLogIn(this.username, this.password)) {
            // Redirect to login page if not logged in
            this.router.navigate(['/Login']);
        }
    } else {
        // Handle the case where localStorage is not available (e.g., server-side rendering)
        // Redirect to login page or handle authentication differently
        this.router.navigate(['/Login']);
    }
  }

  checkLogIn(username: string | null, password: string | null): boolean {
    return username === "admin" && password === "Omnia2023";
  }

  logOut() {
    localStorage.clear();
    // Redirect to login page after successful logout
    this.router.navigate(['/inicio']);
  }
  dateToNumber(value:string):number{
    if(value=="Lunes"){
      return 0;
    }
    if(value=="Martes"){
      return 1;
    }
    if(value=="Miercoles"){
      return 2;
    }
    if(value=="Jueves"){
      return 3;
    }
    if(value=="Viernes"){
      return 4;
    }
    return 0;
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
  
  /*

  removeClass() {
    this.http.delete('/api/remove-class').subscribe(
      () => {
        console.log('Class removed successfully');
      },
      (error) => {
        console.error('Error removing class:', error);
      }
    );
  }
  */

  


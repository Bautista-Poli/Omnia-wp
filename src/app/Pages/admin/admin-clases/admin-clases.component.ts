import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common'; 

import { ClassService } from '../../service/class.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './admin-clases.component.html',
  styleUrl: './admin-clases.component.css'
})
export class AdminClaseComponent implements OnInit {
  hours: string[] = [];

  username: string = "";
  password: string | null = "";

  newClassSrc: string = "";
  newClassName: string = "";
  newClassProfessor: string = "";
  newClassProfessor2: string = "";
  newClassDescription: string = "";
  newClassTime: string = "";
  newClassId: number = 0;

  constructor(private router: Router,private classService:ClassService ) {

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
  addClass(){
    this.classService;
    console.log(this.newClassDescription);
  }

}

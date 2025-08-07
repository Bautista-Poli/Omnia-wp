import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { NgIf } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgIf],
  templateUrl: './LogIn.component.html',
  styleUrl: './LogIn.component.css'
})
export class LogInComponent {
  username: string = "";
  password: string | null = "";
  show:string = "password";

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('username') !== null) {
      this.username = localStorage.getItem('username')!;
      this.password = localStorage.getItem('password');
    }

    if (this.checkLogIn(this.username, this.password)) {
      this.router.navigate(['/admin']);
    }
  }

  checkLogIn(username: string | null, password: string | null): boolean {
    return username === "admin" && password === "admin";
  }

  login() {
    if (this.checkLogIn(this.username, this.password)) {
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password!);
      this.router.navigate(['/admin']);
    } else {
      alert('Invalid username or password');
    }
  }

  showPassword() {
    this.show = this.show === 'password' ? 'text' : 'password';
  }
}
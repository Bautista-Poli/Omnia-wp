import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'menu-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})

export class MenuAdminComponent {

}


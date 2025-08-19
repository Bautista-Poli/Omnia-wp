import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TablaDeClasesComponent } from '../../tabla-de-clases/tabla-de-clases.component';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-revisar-tabla',
  standalone: true,
  imports: [MenuAdminComponent, TablaDeClasesComponent],
  templateUrl: './revisar-tabla.component.html',
  styleUrl: './revisar-tabla.component.css'
})
export class RevisarTablaComponent {

  constructor(
          private router: Router,
          private auth: AuthService,
        ) {}

      
  async logOut() {
    await this.auth.logout().catch(() => {});
    this.router.navigate(['/inicio']);
  }
}

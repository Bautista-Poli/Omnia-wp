import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ControlIdiomaComponent } from './control-idioma/control-idioma.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, RouterLink, TranslateModule, ControlIdiomaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuAbierto = false;
  logoSrc = this.getLogo();

  toggleMenu() { this.menuAbierto = !this.menuAbierto; }
  cerrarMenu() { this.menuAbierto = false; }

  private getLogo(): string {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1; // 1-12
    const dia = hoy.getDate();

    // Halloween: 24 al 31 de octubre
    if (mes === 10 && dia >= 24 && dia <= 31)
      return 'assets/logoHalloween.png';

    // Navidad: 18 al 25 de diciembre
    if (mes === 12 && dia >= 18 && dia <= 30)
      return 'assets/logoNavidad.png';

    return 'assets/logoOmnia.png';
  }
}


import {Component} from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'menu-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
})
export class MenuAdminComponent {
  items = [
    { 
      label: 'Clases', 
      icon: '🏫',
      children: [
        { label: 'Nueva clase', link: '/admin-clases-agregar', icon: '⚙️' },
        { label: 'Eliminar clase', link: '/admin-clases', icon: '❌' },
      ]
    },
    { 
      label: 'Profesores', 
      icon: '👨‍🏫',
      children: [
        { label: 'Nuevo profesor', link: '/admin-profesor-agregar', icon: '⚙️' },
        { label: 'Eliminar profesor', link: '/admin-profesor-eliminar', icon: '❌' },
      ]
    },
    { 
      label: 'Gestión Slots', 
      icon: '⚙️',
      children: [
        { label: 'Nuevo slot',           link: '/admin',                       icon: '🕒' },
        { label: 'Eliminar slot',        link: '/admin-slot-grid',             icon: '❌' },
        { label: 'Cambiar profesor',     link: '/admin-slot-change-profesor',  icon: '👨‍🏫' }, // 👈
      ]
    },
    { label: 'Revisar grilla', link: '/revisar-tabla', icon: '📊' },
  ];

  activeIndex = 0;

  constructor(private router: Router, private auth: AuthService) {
    // Solo actualizamos el índice para saber si mostrar el submenú
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.updateActiveIndex());
  }

  private updateActiveIndex() {
    const url = this.router.url;
    const idx = this.items.findIndex(it => 
      (it.link && url.includes(it.link)) || 
      (it.children?.some(c => url.includes(c.link)))
    );
    if (idx >= 0) this.activeIndex = idx;
  }

  setActive(i: number) {
    this.activeIndex = i;
  }
  async logout() {
    try {
      await this.auth.logout();
    } catch {}

    this.router.navigate(['/inicio']);
  }
}

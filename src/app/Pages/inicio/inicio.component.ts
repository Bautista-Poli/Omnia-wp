// inicio.component.ts
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { TablaDeClasesComponent } from '../tabla-de-clases/tabla-de-clases.component';
import { TranslateModule} from '@ngx-translate/core';
import { CantidadUsuariosComponent } from './cantidad-usuarios/cantidad-usuarios.component';
import { PhotoDisplayerComponent } from './photo-displayer/photo-displayer.component';
import { ReseñasComponent } from './resenias/reseñas.component';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CantidadUsuariosComponent,
    TablaDeClasesComponent,
    PhotoDisplayerComponent,
    CommonModule,
    ReseñasComponent,
    TranslateModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}




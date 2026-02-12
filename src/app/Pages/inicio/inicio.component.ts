// inicio.component.ts
import { Component } from '@angular/core';
import {CantidadUsuariosComponent} from '../InicioComponentes/cantidad-usuarios/cantidad-usuarios.component';
import { PhotoDisplayerComponent } from '../InicioComponentes/photo-displayer/photo-displayer.component';
import { HeaderComponent } from '../Components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../Components/footer/footer.component';
import { TablaDeClasesComponent } from '../tabla-de-clases/tabla-de-clases.component';
import { ReseñasComponent } from '../InicioComponentes/resenias/reseñas.component';
import { TranslateModule} from '@ngx-translate/core';


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
export class InicioComponent {
  
}




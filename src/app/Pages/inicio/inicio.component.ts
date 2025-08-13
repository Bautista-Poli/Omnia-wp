// inicio.component.ts
import { Component } from '@angular/core';
import {CantidadUsuariosComponent} from '../InicioComponentes/cantidad-usuarios/cantidad-usuarios.component';
import { LinksToAppComponent } from '../InicioComponentes/LinksToApp/install-links-to-app.component';
import { PhotoDisplayerComponent } from '../InicioComponentes/photo-displayer/photo-displayer.component';
import { HeaderComponent } from '../Components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../Components/footer/footer.component';
import { TablaDeClasesComponent } from '../InicioComponentes/tabla-de-clases/tabla-de-clases.component';
import { ReseñasComponent } from '../resenias/reseñas.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CantidadUsuariosComponent,
    LinksToAppComponent,
    TablaDeClasesComponent,
    PhotoDisplayerComponent,
    CommonModule,
    ReseñasComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  
}




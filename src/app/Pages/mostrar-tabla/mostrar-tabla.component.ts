import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { TablaDeClasesComponent } from '../tabla-de-clases/tabla-de-clases.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-mostrar-tabla',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    TablaDeClasesComponent],
  templateUrl: './mostrar-tabla.component.html',
  styleUrl: './mostrar-tabla.component.css'
})
export class MostrarTablaComponent {


}

import { Component } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { TablaDeClasesComponent } from '../tabla-de-clases/tabla-de-clases.component';

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

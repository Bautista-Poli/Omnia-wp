import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './Novedades.component.html',
  styleUrl: './Novedades.component.css'
})
export class NovedadesComponent {
  constructor(){
    console.log("Entro")
  }
}

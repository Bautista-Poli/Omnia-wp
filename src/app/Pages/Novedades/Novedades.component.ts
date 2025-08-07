import { Component } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';
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

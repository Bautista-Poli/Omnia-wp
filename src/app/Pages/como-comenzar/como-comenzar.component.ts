import { Component } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-como-comenzar',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent],
  templateUrl: './como-comenzar.component.html',
  styleUrl: './como-comenzar.component.scss'
})
export class ComoComenzarComponent {

}

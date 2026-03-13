import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-como-comenzar',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    TranslateModule],
  templateUrl: './como-comenzar.component.html',
  styleUrl: './como-comenzar.component.scss'
})
export class ComoComenzarComponent {

}

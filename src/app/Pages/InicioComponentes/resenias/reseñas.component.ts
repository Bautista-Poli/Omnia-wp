import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'resenias',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgFor,
    TranslateModule
  ],
  templateUrl: './reseñas.component.html',
  styleUrl: './reseñas.component.css'
})

export class ReseñasComponent {
  reviews = [
    {
      nameKey: 'REVIEWS.ANY.NAME',
      commentKeys: ['REVIEWS.ANY.P1', 'REVIEWS.ANY.P2', 'REVIEWS.ANY.P3'],
    },
    {
      nameKey: 'REVIEWS.ADRIANA.NAME',
      commentKeys: ['REVIEWS.ADRIANA.P1', 'REVIEWS.ADRIANA.P2', 'REVIEWS.ADRIANA.P3'],
    },
    {
      nameKey: 'REVIEWS.ALEJANDRO.NAME',
      commentKeys: ['REVIEWS.ALEJANDRO.P1', 'REVIEWS.ALEJANDRO.P2'],
    },
  ];
}

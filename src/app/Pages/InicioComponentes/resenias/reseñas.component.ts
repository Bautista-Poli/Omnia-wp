import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


type ReviewVM = {
  nameKey: string;         // ej: 'reviews.pelicanSteve'
  sourceKey?: string;      // ej: 'reviews.source.littleSnippets'
  quoteKeys?: string[];    // ej: ['reviews.q1.line1', 'reviews.q1.line2']
  commentKeys?: string[];  // compat con tu estructura actual
  imgUrl: string;          // ruta a la imagen
};

@Component({
  selector: 'resenias',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgFor,
    NgIf,
    TranslateModule
  ],
  templateUrl: './reseñas.component.html',
  styleUrl: './reseñas.component.css'
})


export class ReseñasComponent {
  reviews: ReviewVM[] = [
    {
      nameKey: 'reviews.pelicanSteve',
      sourceKey: 'reviews.source.littleSnippets',
      quoteKeys: [
        'reviews.q1.l1',
        'reviews.q1.l2'
      ],
      imgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg'
    },
    {
      nameKey: 'reviews.maxConversion',
      sourceKey: 'reviews.source.littleSnippets',
      quoteKeys: [
        'reviews.q2.l1',
        'reviews.q2.l2'
      ],
      imgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg'
    },
    {
      nameKey: 'reviews.eleanorFaint',
      sourceKey: 'reviews.source.littleSnippets',
      quoteKeys: [
        'reviews.q3.l1'
      ],
      imgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg'
    }
  ];
}

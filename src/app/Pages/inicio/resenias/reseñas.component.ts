import { Component } from '@angular/core';
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
      nameKey: 'Adriana Hormeche',
      quoteKeys: [
        'reviews.q1'
      ],
      imgUrl: '../../assets/Inicio/usuario1.webp'
    },
    {
      nameKey: 'Any Clari',
      quoteKeys: [
        'reviews.q2'
      ],
      imgUrl: '../../assets/Inicio/usuario2.webp'
    },
    {
      nameKey: 'Alejandro León',
      quoteKeys: [
        'reviews.q3'
      ],
      imgUrl: '../../assets/Inicio/usuario3.webp'
    }
  ];
}

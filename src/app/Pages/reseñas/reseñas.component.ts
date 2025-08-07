import { Component } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-clases-horarios',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgFor
  ],
  templateUrl: './reseñas.component.html',
  styleUrl: './reseñas.component.css'
})
export class ReseñasComponent {
  reviews = [
    {
      name: 'Vero',
      comment: [
        'El mejor gimnasio de palermo.',
        'Excelente atención, excelentes clases y excelente grupo humano.',
        'Recomendable 100%💪'
      ]
    },
    {
      name: 'Yong Ren',
      comment: [
        'Definitely one of the best gyms.',
        'The entrance as well as personal trainers are available at fair price,',
        'The quality of the equipment is super nice and clean.',
        'People are super friendly in the gym.'
      ]
    },
    {
      name: 'Maria Veronica',
      comment: [
        'El mejor gimnasio de Palermo y sus alrededores!!',
        'Un nivel de profesores de excelencia.',
        'Estructura impecable y siempre limpia.'
      ]
    }
  ];
}

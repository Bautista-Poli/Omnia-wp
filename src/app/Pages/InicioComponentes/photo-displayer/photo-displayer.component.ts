import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'photo-displayer',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './photo-displayer.component.html',
  styleUrl: './photo-displayer.component.css'
})
export class PhotoDisplayerComponent {
  images = [
    'assets/OMNIA-SLIDER2-1.png',
    'assets/OMNIA-SLIDER3-1.png',
    'assets/OMNIA-SLIDER1-1.png',
  ];

  ready = false;

  customOptions: OwlOptions = {
    loop: this.images.length > 1,   // evita clones si hay 1 sola
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    nav: true,
    navSpeed: 700,
    autoWidth: false,
    navText: ['<-', '->'],
    responsive: {
      0: { items: 1 },
      740: { items: 1 },
      940: { items: 1 }
    },
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 600
  };
}


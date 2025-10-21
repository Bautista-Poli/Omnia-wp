import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'photo-displayer',
  standalone: true,
  imports: [CommonModule, CarouselModule, TranslateModule],
  templateUrl: './photo-displayer.component.html',
  styleUrl: './photo-displayer.component.css'
})
export class PhotoDisplayerComponent implements OnInit, OnDestroy {
  private t = inject(TranslateService);
  private sub?: Subscription;

  // mapas por idioma
  private imagesByLang: Record<'es'|'en', string[]> = {
    es: [
      'assets/Inicio/OMNIA-SLIDER2-1.png',
      'assets/Inicio/OMNIA-SLIDER3-1.png',
      'assets/Inicio/OMNIA-SLIDER1-1.png',
    ],
    en: [
      'assets/Clientes.jpg',
      'assets/Maquinas.jpg',
      'assets/Indoor.jpg',
    ],
  };

  images: string[] = [];
  ready = false; // para forzar rerender al cambiar de idioma

  customOptions: OwlOptions = {
    loop: true, // se ajusta en resetCarousel() según cantidad
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 700,
    autoWidth: false,
    navText: ['<-', '->'],
    responsive: { 0: { items: 1 }, 740: { items: 1 }, 940: { items: 1 } },
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 600
  };

  ngOnInit(): void {
    // set inicial
    this.applyLang(this.t.currentLang || 'es');

    // actualizar al vuelo
    this.sub = this.t.onLangChange.subscribe(e => this.applyLang(e.lang));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private applyLang(lang: string) {
    const l: 'es'|'en' = lang?.toLowerCase().startsWith('en') ? 'en' : 'es';
    this.images = this.imagesByLang[l] ?? this.imagesByLang.es;
    this.resetCarousel();
  }

  private resetCarousel() {
    // si hay 1 sola imagen, desactivar loop para evitar clones
    this.customOptions = { ...this.customOptions, loop: this.images.length > 1 };

    // truco simple para que ngx-owl-carousel-o re-renderice:
    this.ready = false;
    queueMicrotask(() => this.ready = true);
  }
}



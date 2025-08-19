import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-cantidad-usuarios',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cantidad-usuarios.component.html',
  styleUrl: './cantidad-usuarios.component.css'
})
export class CantidadUsuariosComponent implements AfterViewInit {

  private animado = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    // ✅ Ejecutar solo en navegador
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  private onScroll(): void {
    const section = this.el.nativeElement.querySelector('.counter-box');
    if (!section || this.animado) return;

    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight) {
      this.startCounters();
      this.animado = true;
    }
  }

  private startCounters(): void {
    const counters = this.el.nativeElement.querySelectorAll('.counter');

    counters.forEach((counter: HTMLElement) => {
      const target = parseInt(counter.getAttribute('data-number') || '0', 10);
      let current = 0;
      const duration = 1000;
      const stepTime = 2;
      const steps = duration / stepTime;
      const increment = target / steps;

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        counter.textContent = Math.ceil(current).toLocaleString('en');
      }, stepTime);
    });
  }
}

import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-cantidad-usuarios',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cantidad-usuarios.component.html',
  styleUrl: './cantidad-usuarios.component.css'
})
export class CantidadUsuariosComponent implements AfterViewInit, OnDestroy {
  private animado = false;
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const trigger = this.el.nativeElement.querySelector('.counter-box'); // o '#counter-section-container'
    if (!trigger) return;

    // Usamos IntersectionObserver para disparar una sola vez cuando entra al viewport
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.some(e => e.isIntersecting);
          if (visible && !this.animado) {
            this.animado = true;
            // Volvemos al zone sólo para actualizar el DOM
            this.ngZone.run(() => this.startCounters());
            this.observer?.disconnect();
          }
        },
        { root: null, threshold: 0.2 } // 20% visible
      );
      this.observer.observe(trigger);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private startCounters(): void {
    const counters = this.el.nativeElement.querySelectorAll('.counter') as NodeListOf<HTMLElement>;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-number') || '0', 10);
      const duration = 2000;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cúbico: arranca rápido, frena suave al final
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.ceil(eased * target).toLocaleString('es-AR');

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target.toLocaleString('es-AR');
        }
      };

      requestAnimationFrame(animate);
    });
  }
}

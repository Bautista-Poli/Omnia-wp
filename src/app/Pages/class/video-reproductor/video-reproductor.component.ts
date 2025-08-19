// video-reproductor.component.ts
import {
  AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2, ViewChild, Inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-hero-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-reproductor.component.html',
  styleUrls: ['./video-reproductor.component.css']
})
export class VideoReproductorComponent implements AfterViewInit, OnDestroy {
  @Input() srcMp4 = '';
  @Input() srcWebm = '';
  @Input() poster?: string;

  @ViewChild('vid', { static: false, read: ElementRef })
  private vidRef!: ElementRef<HTMLVideoElement>;
  private videoEl!: HTMLVideoElement;
  private unsub: Array<() => void> = [];

  constructor(private r: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // 👉 No hagas nada en SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Tomar el elemento real del DOM del navegador
    const el = this.vidRef?.nativeElement;
    if (!el || el.tagName !== 'VIDEO' || typeof el.play !== 'function') {
      console.error('No se obtuvo un <video> válido en navegador. Obtenido:', el);
      return;
    }
    this.videoEl = el;

    // Estado inicial + autoplay
    this.videoEl.muted = true;
    void this.videoEl.play().catch(() => {});

    // Reintentar si se pausa
    this.unsub.push(
      this.r.listen(this.videoEl, 'pause', () => { void this.videoEl.play().catch(() => {}); })
    );

    // Reanudar al volver la pestaña
    this.unsub.push(
      this.r.listen(document, 'visibilitychange', () => {
        if (!document.hidden && this.videoEl.paused) {
          void this.videoEl.play().catch(() => {});
        }
      })
    );

    // Opcionales: bloquear click derecho y atajos
    this.unsub.push(this.r.listen(document, 'contextmenu', (e: Event) => e.preventDefault()));
    this.unsub.push(this.r.listen(document, 'keydown', (e: KeyboardEvent) => {
      if ([' ', 'Spacebar', 'Enter'].includes(e.key)) e.preventDefault();
    }));
  }

  ngOnDestroy(): void {
    this.unsub.forEach(u => u());
  }
}

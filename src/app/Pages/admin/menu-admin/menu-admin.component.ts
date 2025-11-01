import {
  AfterViewInit, Component, ElementRef, HostListener,
  QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'menu-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
})
export class MenuAdminComponent implements AfterViewInit {
  items = [
    { label: 'Nueva clase',            link: '/admin-clases' },
    { label: 'Nuevo profesor',         link: '/admin-profesores' },
    { label: 'Nuevo slot',             link: '/admin' },
    { label: 'Setear profesor a slot', link: '/admin-setear-profesor' },
    { label: 'Revisar la tabla',       link: '/revisar-tabla' },
  ];

  activeIndex = 0;

  @ViewChildren('btnRef') btnRefs!: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChild('indicator') indicatorRef!: ElementRef<HTMLDivElement>;
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveByUrl();
        setTimeout(() => this.snapToActive());
      });
  }

  ngAfterViewInit(): void {
    this.updateActiveByUrl();
    setTimeout(() => this.snapToActive());
  }

  private updateActiveByUrl() {
    const url = this.router.url.split('?')[0];
    const idx = this.items.findIndex(it => url.startsWith(it.link));
    if (idx >= 0) this.activeIndex = idx;
  }

  moveIndicator(i: number) {
    this.positionIndicator(i);
  }

  setActive(i: number) {
    this.activeIndex = i;
  }

  snapToActive() {
    this.positionIndicator(this.activeIndex);
  }

  @HostListener('window:resize')
  onResize() {
    this.snapToActive();
  }

  private positionIndicator(i: number) {
    const container = this.containerRef?.nativeElement;
    const indicator = this.indicatorRef?.nativeElement;
    const btn = this.btnRefs?.get(i)?.nativeElement;
    if (!container || !indicator || !btn) return;

    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();

    const left = bRect.left - cRect.left + container.scrollLeft;
    const top = bRect.top - cRect.top + container.scrollTop;

    indicator.style.transform = `translate(${left}px, ${top}px)`;
    indicator.style.width = `${bRect.width}px`;
    indicator.style.height = `${bRect.height}px`;
  }
}

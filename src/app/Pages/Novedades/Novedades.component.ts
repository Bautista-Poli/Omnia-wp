import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AnimacionCargaComponent } from '../tabla-de-clases/animacion-carga/animacion-carga.component';

interface BeholdPost {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}
interface BeholdFeed {
  posts: BeholdPost[];
}

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, TranslateModule],
  templateUrl: './Novedades.component.html',
  styleUrl: './Novedades.component.css'
})
export class NovedadesComponent implements OnInit {
  private readonly feedUrl = 'https://feeds.behold.so/NgMUqbSi1gjZZ3nQPJfE';

  posts: BeholdPost[] = [];
  isLoading = true;
  error = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.http.get<BeholdFeed>(this.feedUrl).subscribe({
      next: (data) => {
        this.posts = data.posts ?? (data as any) ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.error = true;
        this.isLoading = false;
      }
    });
  }

  getThumb(post: BeholdPost): string {
    return post.thumbnailUrl || post.mediaUrl;
  }
}

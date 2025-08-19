// language.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    this.translate.addLangs(['es', 'en']);

    // Solo acceder a window/localStorage en browser
    const saved = this.isBrowser ? window.localStorage.getItem(STORAGE_KEY) : null;

    // Evitar leer navigator en server
    const browserLang = this.isBrowser && typeof navigator !== 'undefined' ? navigator.language : 'es';


    const initial = (saved ?? browserLang).toLowerCase().startsWith('en') ? 'en' : 'es';

    // set default/fallback por código (opcional, ya pusimos fallbackLang en forRoot)
    this.translate.setDefaultLang('es');

    // idioma actual
    this.setLanguage(initial);
  }

  setLanguage(lang: 'es' | 'en') {
    this.translate.use(lang);
    if (this.isBrowser) {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  toggle() {
    const current = (this.translate.currentLang as 'es' | 'en') || 'es';
    this.setLanguage(current === 'es' ? 'en' : 'es');
  }

  current() {
    return (this.translate.currentLang as 'es' | 'en') || 'es';
  }
}


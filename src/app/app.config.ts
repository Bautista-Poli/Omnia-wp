// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';

class SimpleHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private prefix = '/assets/i18n/', private suffix = '.json') {}

  getTranslation(lang: string): Observable<TranslationObject> {
    return this.http.get<TranslationObject>(`${this.prefix}${lang}${this.suffix}`);
  }
}

function loaderFactory(http: HttpClient) { return new SimpleHttpLoader(http); }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        // 👇 reemplaza defaultLanguage/useDefaultLang por:
        fallbackLang: 'es',
        loader: { provide: TranslateLoader, useFactory: loaderFactory, deps: [HttpClient] },
      })
    ),
  ],
};





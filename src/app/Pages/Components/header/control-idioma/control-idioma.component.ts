import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../service/i18/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'control-idioma',
  standalone: true,
  imports: [MatMenuModule,TranslateModule,CommonModule],
  templateUrl: './control-idioma.component.html',
  styleUrl: './control-idioma.component.css'
})

export class ControlIdiomaComponent {
  private lang = inject(LanguageService);
  t = inject(TranslateService);

  langs: Array<'es' | 'en'> = ['es', 'en'];

  currentLang() {
    return this.lang.current();
  }

  setLang(lang: 'es' | 'en') {
    this.lang.setLanguage(lang);
  }
}


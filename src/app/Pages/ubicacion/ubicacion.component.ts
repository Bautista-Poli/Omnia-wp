import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  embedUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const pb = '!1m18!1m12!1m3!1d3284.958925249755!2d-58.43380212509947!3d-34.579905856239634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59053b3c695%3A0x58f11ec90bdd87e1!2sOmnia%20Fitness%20Center!5e0!3m2!1sen!2sar!4v1754773395187!5m2!1sen!2sar';
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed?pb=${pb}`
    );
  }
}


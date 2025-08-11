import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class HourService {
    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
      ) {
      }
}
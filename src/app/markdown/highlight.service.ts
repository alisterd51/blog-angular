import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare let Prism: { highlightAll: () => void; };

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object
  ) { }

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
}

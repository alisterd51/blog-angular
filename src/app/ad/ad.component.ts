import { Component } from '@angular/core';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent {
  url: string = 'https://cdn.anclarma.fr/ads.md';
}

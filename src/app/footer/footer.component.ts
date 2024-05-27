import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatSidenavModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  apiDocs = environment.apiLink + '/api';
  githubLink = environment.githubLink;
}

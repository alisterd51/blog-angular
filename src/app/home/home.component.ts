import { Component } from '@angular/core';
import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArticleListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

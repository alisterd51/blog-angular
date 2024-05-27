import { Component, Input } from '@angular/core';
import { Article } from '../article/article';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [MatCardModule, RouterModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.css'
})
export class ArticlePreviewComponent {
  @Input()
  article: Article = {
    id: 0,
    name: '',
    title: '',
    summary: '',
    url: ''
  };
}

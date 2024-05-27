import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticlePreviewComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  articles!: Article[];

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }
}

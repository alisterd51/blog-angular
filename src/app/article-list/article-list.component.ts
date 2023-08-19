import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList!: Observable<Article[]>;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleList = this.articleService.getArticles();
  }
}

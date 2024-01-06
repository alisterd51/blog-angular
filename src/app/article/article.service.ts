import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getMarkdown(url: string) {
    return this.http.get(url, {responseType: 'text'});
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('https://api.anclarma.fr/pages');
  }

  getArticle(name: string): Observable<Article> {
    return this.http.get<Article>('https://api.anclarma.fr/pages/name/' + name);
  }
}

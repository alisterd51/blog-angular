import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './article';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getMarkdown(name: string): Observable<string> {
    return this.http.get(environment.apiLink + '/pages/file/name/' + name, {responseType: 'text'});
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.apiLink + '/pages');
  }

  getArticle(name: string): Observable<Article> {
    return this.http.get<Article>(environment.apiLink + '/pages/name/' + name);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService],
})
export class ArticleComponent implements OnInit {
  @Input()
  url = 'https://api.anclarma.fr/pages/file/name/blog-angular.md';
  //TODO a remplacer par un 404 si le nom de l'article n'est pas valid
  param!: string | null;
  data!: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('name');
    if (this.param === null) {
      this.download();
    } else {
      this.url = 'https://api.anclarma.fr/pages/file/name/' + this.param;
      this.download();
    }
  }

  async download() {
    this.data = await lastValueFrom(
      this.articleService.getMarkdown(this.url),
      { defaultValue: 'Failed to download the article [' + this.url + '](' + this.url + ')' }
    );
  }
}

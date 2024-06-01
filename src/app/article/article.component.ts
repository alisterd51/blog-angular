import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from './article.service';
import { lastValueFrom } from 'rxjs';
import { MarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  @Input()
  name!: string;
  data!: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('name');
    if (param === null) {
      this.download();
    } else {
      this.name = param;
      this.download();
    }
  }

  async download() {
    this.data = await lastValueFrom(
      this.articleService.getMarkdown(this.name),
      { defaultValue: 'Failed to download the article ' + this.name }
    )
  }
}

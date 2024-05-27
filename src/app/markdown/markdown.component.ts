import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { HighlightService } from './highlight.service';
import { marked } from 'marked';
import { mangle } from 'marked-mangle';

@Component({
  selector: 'app-markdown',
  standalone: true,
  imports: [],
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.css'
})
export class MarkdownComponent implements OnInit, AfterViewChecked {
  @Input()
  data = '# Hello World!';
  md!: string;
  highlighted = false;

  constructor(
    private highlightService: HighlightService
  ) { }

  async ngOnInit(): Promise<void> {
    marked.use(mangle());
    this.md = await marked(this.data);
  }

  ngAfterViewChecked(): void {
    if (this.md && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}

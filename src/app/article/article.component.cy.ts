import { RouterTestingModule } from '@angular/router/testing'
import { ArticleComponent } from './article.component'
import { HttpClientModule } from '@angular/common/http'

describe('ArticleComponent', () => {
  it('should mount', () => {
    cy.mount(ArticleComponent, {
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
    })
  })
})
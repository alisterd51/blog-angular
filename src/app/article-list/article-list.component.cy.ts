import { HttpClientModule } from '@angular/common/http'
import { ArticleListComponent } from './article-list.component'

describe('ArticleListComponent', () => {
  it('should mount', () => {
    cy.mount(ArticleListComponent, {
      imports: [HttpClientModule],
    })
  })
})
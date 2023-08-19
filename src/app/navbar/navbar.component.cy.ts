import { MatMenuModule } from '@angular/material/menu'
import { NavbarComponent } from './navbar.component'

describe('NavbarComponent', () => {
  it('should mount', () => {
    cy.mount(NavbarComponent, {
      imports: [MatMenuModule],
    })
  })
})
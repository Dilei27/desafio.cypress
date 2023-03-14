

describe('Home Page', ()=> {
  it('Página do desafio', ()=> {
      cy.visit('https://blogdoagi.com.br/')
      cy.get('#site-branding > .custom-logo-wrap > .custom-logo-link > .custom-logo')
          .should('be.visible')
  })
})
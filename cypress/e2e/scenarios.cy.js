

describe.only('Pesquisa', () => {
    beforeEach(() => {
        cy.visit('https://blogdoagi.com.br/')
        cy.get('#site-branding > .custom-logo-wrap > .custom-logo-link > .custom-logo')
            .should('be.visible')
        cy.get('#overlay-open').click()
    })

    it('retorna resultados precisos baseados em palavras-chave', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('Agibank')
            .type('{enter}')

        cy.get('.entry-title')
            .should('be.visible')
            .contains('Agibank')
    })

    it('retorna resultados precisos baseados em frases', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('Agi se estrutura para continuar avançando')
            .type('{enter}')

        cy.get('.entry-title')
            .should('be.visible')
            .contains('Agi se estrutura para continuar avançando')
    })

    it('retorna resultados precisos baseados em sinônimos', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('enquete')
            .type('{enter}')

        cy.get('.entry-title')
            .should('be.visible')
            .contains('Nenhum resultado')
    })

    it('não retorna resultados precisos ou não funciona corretamente', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('recolha')
            .type('{enter}')

        cy.get('.entry-title')
            .should('be.visible')
            .contains('Nenhum resultado')
    })

    it('permite filtragem por data de publicação', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('01/01/23 á 01/04/23')
            .type('{enter}')

        cy.get('.entry-title')
            .should('be.visible')
            .contains('Nenhum resultado')
    })

    it('permite filtragem por categoria de artigo', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('Agibank amplia atuação nacional e deve inaugurar 20 novas lojas ainda neste ano')
            .type('{enter}')

        cy.get('.entry-title')
            .should('be.visible')
            .contains('Agibank amplia atuação nacional e deve inaugurar 20 novas lojas ainda neste ano')
    })

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    it('permite ordenação dos resultados por data ou relevância', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('agi')
            .type('{enter}')

        cy.get('.search-results article')
            .eq(0)
            .find('span[class="entry-date"]')
            .invoke('text')
            .then(dateString => {
                const year = new Date(dateString).getFullYear()
                expect(year).to.be.at.least(2023)
            })
    })

    it('oferece autocompletar durante a digitação da pesquisa', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('prod')

        cy.get('.autocomplete-result')
            .should('not.exist')
    })

    it('Opção de limpar a pesquisa atual', () => {
        cy.get('.mobile-search > .search-form > label > .search-field')
            .type('prod')
            .should('have.value', 'prod')

        cy.get('.mobile-search > .search-form > label > .search-field')
            .clear()
            .should('have.value', '')
    })

})
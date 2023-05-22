const spellcheck = (url,reportName) => {
    cy.intercept('GET',url).as('html')
    cy.visit(url)
    cy.wait('@html').then((reporthtml)=>{
        let data = reporthtml.response.body
        cy.task("checkspell", {data,reportName : reportName}).then((resp) => {
            cy.log(resp.message)
        });
    })
}

Cypress.Commands.add('spellCheck',spellcheck)
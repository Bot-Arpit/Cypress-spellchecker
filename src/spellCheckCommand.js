const spellcheck = (url,reportName) => {
    cy.request(url).then((response) => {
        let data = response.body
        cy.task("checkspell", {data,reportName : reportName}).then((resp) => {
            cy.log(resp.message)
        });
    })
}

Cypress.Commands.add('spellCheck',spellcheck)
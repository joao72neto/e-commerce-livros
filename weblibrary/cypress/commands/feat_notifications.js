const time = 1500;

//Abrindo um livro por id
Cypress.Commands.add('closeNotification', (sleep=time) => {

    cy.visit('/');
    cy.get('#notificacao-index a').first().click();
    cy.wait(sleep);
    cy.get('a.mark-as-read').first().click();
    cy.wait(sleep);

});
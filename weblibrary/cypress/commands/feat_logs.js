const time = 1500;

//Registering card
Cypress.Commands.add('checkLogTable', (sleep=time) => {

    //Visiting log page
    cy.visit('/logs');
    cy.wait(sleep);

    // Verify the table renders
    cy.get('[data-cy=log-table]').should('be.visible');

    // check that at least one row is present
    cy.get('[data-cy=log-row]').should('have.length.greaterThan', 0);

    // check headers
    cy.get('[data-cy=log-header]').should('contain', 'Data');
    cy.get('[data-cy=log-header]').should('contain', 'Usuário');
    cy.get('[data-cy=log-header]').should('contain', 'Operação');
    cy.get('[data-cy=log-header]').should('contain', 'Descrição');

});     

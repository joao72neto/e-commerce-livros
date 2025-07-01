const time = 1500;

//Filtering sales by category
Cypress.Commands.add('filtrarVendasCategoria', (sleep=time) => {

    // Visit the history page
    cy.visit('/vendas/historico');
      
    // Open dropdown and select option
    cy.wait(sleep);
    cy.get('.choices__inner').click();
    cy.wait(sleep);
    cy.get('.choices__item--choice').contains('Aventura').click();
    cy.wait(sleep);
    cy.get('.choices__item--choice').contains('Distopia').click();
    cy.wait(sleep);
    cy.get('.choices__item--choice').contains('Fábula').click();
  
    //Flitering data
    cy.wait(sleep);
    cy.get('.btn-flt-cat a').click({force: true});

    //Cleaning up filter
    cy.wait(sleep);
    cy.get('.btn-clean-cat a').click();
    cy.wait(sleep);
    cy.get('.btn-flt-cat a').click();
 
});

//Filtering sales by period
Cypress.Commands.add('filtrarVendasPeriodo', (start, end, sleep=time) => {

    // Visit the history page
    cy.visit('/vendas/historico');
      
    // Set period
    cy.get('#data-range').type(start + ' até ' + end, {force: true});

    //Flitering sales by period
    cy.wait(sleep);
    cy.get('.btn-flt-data a').click({force: true});

    //Cleaning up filter
    cy.wait(sleep);
    cy.get('.btn-clean-periodo a').click();
    cy.wait(sleep);
    cy.get('.btn-flt-data a').click();

});

//Filtering sales by period and category
Cypress.Commands.add('filtrarVendasPeriCat', (start, end, sleep=time) => {

    // Visit the history page
    cy.visit('/vendas/historico');
      
    // Open dropdown and select option
    cy.wait(sleep);
    cy.get('.choices__inner').click();
    cy.wait(sleep);
    cy.get('.choices__item--choice').contains('Clássico Brasileiro').click();
    cy.wait(sleep);
    cy.get('.choices__item--choice').contains('Distopia').click();
    cy.wait(sleep);
    cy.get('.choices__item--choice').contains('Fábula').click();

    //Flitering sales by category
    cy.wait(sleep);
    cy.get('.btn-flt-cat a').click({force: true});

    // Set period
    cy.get('#data-range').type(start + ' até ' + end, {force: true});

    //Flitering sales by period
    cy.wait(sleep);
    cy.get('.btn-flt-data a').click({force: true});

});
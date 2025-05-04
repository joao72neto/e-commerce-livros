const sleep = 1500;

//Fazendo login de um usuáruio no sistema
Cypress.Commands.add('logarUsuario', () => {

    //Visitando a página de clientes
    cy.visit('/clientes');

    //Logando com o cliente de id 1
    cy.wait(sleep);
    cy.get('.login').first().click();

    //Esperando para voltar para a pǵina inicial
    cy.wait(sleep);

});


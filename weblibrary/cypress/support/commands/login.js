const sleep = 1500;

//Fazendo login de um usuáruio no sistema
Cypress.Commands.add('logarUsuario', (clt_id=1) => {

    //Visitando a página de clientes
    cy.visit('/clientes');

    //Logando com o cliente 
    cy.wait(sleep);
    cy.get('.cliente-id').contains(clt_id).closest('.wrapper').find('.login').click();

    //Esperando para voltar para a pǵina inicial
    cy.wait(sleep);

});


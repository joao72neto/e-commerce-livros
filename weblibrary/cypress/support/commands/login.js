const time = 1500;

//Fazendo login de um usuáruio no sistema
Cypress.Commands.add('logarUsuario', (clt_id=1, sleep=time) => {

    //Visitando a página de clientes
    cy.visit('/clientes');

    //Logando com o cliente 
    cy.wait(sleep);
    cy.get('.cliente-id').each($id => {
        if($id.text().trim() === String(clt_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('.login').click();
            });
        }
    });
});


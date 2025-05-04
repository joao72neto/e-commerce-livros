//Deve reprovar o pedidos de um usuário
Cypress.Commands.add('devolverLivroId', (lvr_id, sleep=2000) => {

    //Página a ser visitada
    cy.visit('/pedidos');

    //Recusando o pedido de um usuário
    cy.wait(sleep);

    //Encontrando o livro
    cy.get('.book-id').contains(lvr_id).closest('.wrapper').then($wrapper => {

        const status = $wrapper.find('.status').text().trim();
        
        if(status === 'Entregue'){
            cy.wrap($wrapper).find('.devolucao').click();
        }

    })

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);
});

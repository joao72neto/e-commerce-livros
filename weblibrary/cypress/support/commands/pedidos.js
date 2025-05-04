//Deve reprovar o pedidos de um usuário
Cypress.Commands.add('reprovarPedidoId', (lvr_id, sleep=2000) => {
    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Recusando o pedido de um usuário
    cy.wait(sleep);

    cy.get('.lvr-id').contains(lvr_id).closest('.wrapper').within(() => {
        cy.get('#processamento').select('Reprovado');
    });

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);
});

//Deve cancelar o pedido do cliente
Cypress.Commands.add('cancelarPedidoId', (lvr_id, sleep=2000) => {
    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Cancelando o pedidos do cliente
    cy.wait(sleep);

    cy.get('.lvr-id').contains(lvr_id).closest('.wrapper').within(() => {
        cy.get('#processamento').select('Cancelado');
    });

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);
});

//Deve aceitar o pedidos do cliente
Cypress.Commands.add('aprovarPedidoId', (lvr_id, sleep=2000) => {
    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Recusando
    cy.wait(sleep);

    cy.get('.lvr-id').contains(lvr_id).closest('.wrapper').within(() => {
        cy.get('#processamento').select('Aprovado');
    });

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);

    //Mudando o stauts para em transporte
    cy.visit('/pedidos/gerenciar');

    cy.get('.lvr-id').contains(lvr_id).closest('.wrapper').within(() => {
        cy.get('#entrega').select('Em Transporte');
    });

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);

    //Mudando o status para enutregue
    cy.visit('/pedidos/gerenciar');

    cy.get('.lvr-id').contains(lvr_id).closest('.wrapper').within(() => {
        cy.get('#entrega').select('Entregue');
    });

    cy.wait(sleep);
});



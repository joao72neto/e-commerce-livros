const time = 1500;

//Deve reprovar o pedidos de um usuário
Cypress.Commands.add('reprovarPedidoId', (vnd_id, sleep=time) => {
    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Recusando o pedido de um usuário
    cy.wait(sleep);

    cy.get('.vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#processamento').select('Reprovado');
            });
        }
    });

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);
});

//Deve cancelar o pedido do cliente
Cypress.Commands.add('cancelarPedidoId', (vnd_id, sleep=time) => {
    
    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Cancelando o pedidos do cliente
    cy.wait(sleep);

    cy.get('.vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#processamento').select('Cancelado');
            });
        }
    });

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);
});

//Deve aceitar o pedidos do cliente
Cypress.Commands.add('aprovarPedidoId', (vnd_id, sleep=time) => {
    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Recusando
    cy.wait(sleep);

    cy.get('.vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#processamento').select('Aprovado');
            });
        }
    });

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);

    //Mudando o stauts para em transporte
    cy.visit('/pedidos/gerenciar');

    cy.get('.vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#entrega').select('Em Transporte');
            });
        }
    });

    cy.wait(sleep);
    cy.visit('/pedidos');
    cy.wait(sleep);

    //Mudando o status para enutregue
    cy.visit('/pedidos/gerenciar');

    cy.get('.vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#entrega').select('Entregue');
            });
        }
    });

    cy.wait(sleep);
});



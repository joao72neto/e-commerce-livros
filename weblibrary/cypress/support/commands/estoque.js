//Retornando item para o estoque
Cypress.Commands.add('retornarEstoqueId', (vnd_id, sleep=time) => {

    //Obtendo todos os alerts
    const alerts = cy.stub();
    cy.on('window:alert', alerts);

    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Recusando o pedido de um usuário
    cy.wait(sleep);

    //Encontrando o livro
    cy.get('.devolucao .vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('.acoes a').click();
                cy.wait(sleep);
            });
        }
    });

    //Retornando o item para o estoque
    cy.wait(sleep);
    cy.get('.submit button').click();
    cy.wait(sleep);

    //Verificando todos os alerts
    cy.wrap(alerts).should(stub => {
        expect(stub.getCall(0)).to.be.calledWith('Entrada adicionada com sucesso!');
    });
});

//Exibindo o estoque
Cypress.Commands.add('exibirEstoque', (sleep=time) => {

    cy.wait(sleep);
    cy.visit('/estoque');
    cy.wait(sleep);
});

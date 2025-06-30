//Retornando item para o estoque
Cypress.Commands.add('retornarEstoqueId', (vnd_id, dev=true, sleep=time) => {

    //Obtendo todos os alerts
    const alerts = cy.stub();
    cy.on('window:alert', alerts);

    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Recusando o pedido de um usuário
    cy.wait(sleep);

    //Definindo o tipo (troca ou devolução)
    let tipo = '.devolucao';
    if(!dev) tipo = '.troca';

    //Encontrando o livro
    cy.get(`${tipo} .vnd-id`).each($id => {
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

    //Verificando os alerts da troca
    cy.wrap(alerts).should(stub => {
        expect(stub.getCall(0)).to.be.calledWith('Entrada adicionada com sucesso!');
    });
    return;
  
});

//Exibindo o estoque
Cypress.Commands.add('exibirEstoque', (sleep=time) => {

    cy.wait(sleep);
    cy.visit('/estoque');
    cy.wait(sleep);
});

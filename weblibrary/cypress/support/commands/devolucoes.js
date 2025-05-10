const time = 1500;

//Deve solicitar a devolução de livros
Cypress.Commands.add('devolverLivroId', (lvr_id, alguns=true, qtdTrc=1, sleep=time) => {

    //Página a ser visitada
    cy.visit('/pedidos');

    //Solicitando a devolução do livro 
    cy.wait(sleep);

    //Encontrando o livro
    cy.get('.book-id').each($id => {

        if($id.text().trim() === String(lvr_id)){

            cy.wrap($id).closest('.wrapper').then($wrapper => {
                
                const status = $wrapper.find('.status').text().trim();
                if(status === 'Entregue'){

                    cy.wrap($wrapper).find('.devolucao').click();
                    
                    if(alguns){

                        cy.wrap($wrapper).find('.dev-alguns').click();
                        cy.wait(sleep);
                        cy.get('#qtd-troca').clear().type(qtdTrc);
                        cy.wait(sleep);
                        cy.wrap($wrapper).find('.devolucao').click();
                        cy.wait(sleep);
                        return;

                    }
                    
                    cy.wait(sleep);
                    cy.wrap($wrapper).find('.dev-tudo').click();
                    cy.wait(sleep);
                }
            });
        }
    });


    // Verificando o alert
    cy.on('window:alert', msg => {
        expect(msg).to.contains('devolucao solicitado(a) com sucesso!');
    });
});


//Deve aceitar a devolução de livros 
Cypress.Commands.add('aceitarDevolucaoId', (vnd_id, sleep=time) => {

    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Aceitando a devolução do livro
    cy.wait(sleep);

    //Encontrando o livro
    cy.get('.pedidos .vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#devolucao').select('Devolução Aceita');
            });
        }
    });

    cy.wait(sleep);
});

//Deve recusar a devolução de livros 
Cypress.Commands.add('recusarDevolucaoId', (vnd_id, sleep=time) => {

    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Recusando o pedido de um usuário
    cy.wait(sleep);

    //Encontrando o livro
    cy.get('.pedidos .vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#devolucao').select('Devolução Recusada');
            });
        }
    });

    cy.wait(sleep);
});

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







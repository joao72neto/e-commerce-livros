const time = 1500;

//Deve solicitar a devolução de livros
Cypress.Commands.add('trocarLivroId', (vnd_id, alguns=true, qtdTrc=1, sleep=time) => {

    //Página a ser visitada
    cy.visit('/pedidos');

    //Solicitando a devolução do livro 
    cy.wait(sleep);

    //Encontrando o livro
    cy.get('.vnd-id').each($id => {

        if($id.text().trim() === String(vnd_id)){

            cy.wrap($id).closest('.wrapper').then($wrapper => {
                
                const status = $wrapper.find('.status').text().trim();
                if(status === 'Entregue'){

                    cy.wrap($wrapper).find('.troca').click();

                    if(alguns){
                        cy.wait(sleep);
                        cy.wrap($wrapper).find('.tro-alguns').click();
                        cy.wait(sleep);
                        cy.get('#qtd-troca').clear({force: true}).type(qtdTrc, {force: true});
                        cy.wait(sleep);
                        cy.wrap($wrapper).find('.troca').click();
                        cy.wait(sleep);
                        return;
                    }
                    
                    cy.wait(sleep);
                    cy.wrap($wrapper).find('.tro-tudo').click();
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
Cypress.Commands.add('aceitarTrocaId', (vnd_id, sleep=time) => {

    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Aceitando a devolução do livro
    cy.wait(sleep);

    //Encontrando o livro
    cy.get('.pedidos .vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#troca').select('Troca Aceita',  {force: true});
            });
        }
    });

    cy.wait(sleep);
});

//Deve recusar a devolução de livros 
Cypress.Commands.add('recusarTrocaId', (vnd_id, sleep=time) => {

    //Página a ser visitada
    cy.visit('/pedidos/gerenciar');

    //Recusando o pedido de um usuário
    cy.wait(sleep);

    //Encontrando o livro
    cy.get('.pedidos .vnd-id').each($id => {
        if($id.text().trim() === String(vnd_id)){
            cy.wrap($id).closest('.wrapper').then($wrapper => {
                cy.wrap($wrapper).find('#troca').select('Troca Recusada',  {force: true});
            });
        }
    });

    cy.wait(sleep);
});

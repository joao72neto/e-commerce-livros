const time = 1500;

//Abrindo um livro por id
Cypress.Commands.add('comprarLivroId', (lvr_id, lvr_qtd=1, sleep=time) => {

    //Visitando a página principal do e-commerce
    cy.visit('/');

    //Abrindo o livro
    cy.wait(sleep);
    cy.get('.book-id').each($id => {
        if($id.text().trim() === String(lvr_id)){
            cy.wrap($id).closest('.book').then($book => {
                cy.wrap($book).find('.imagem').click();
            });
        }
    });

    //Definindo a qtd do livro a ser comprado
    cy.wait(sleep);
    cy.get('#contador').then($cont => {
        $cont.text(lvr_qtd);
    });

    //Clicando no botão de compra
    cy.wait(sleep);
    cy.get('.comprar').click();
    cy.wait(sleep);
});

//Finalizando a compra
Cypress.Commands.add('finalizarCompra', (end=9, cardTot=1, sleep=time) => {

    //Obtendo todos os alerts
    const alerts = cy.stub();
    cy.on('window:alert', alerts);

    //Visitando a página de pagamento
    cy.visit('/pagamento');

    //Finalizando sem adicionar o endereço
    cy.wait(sleep);
    cy.get('.finalizar-compra a').click();

    //Escolhendo o endereço
    cy.wait(sleep);
    cy.get('#endereco').select(String(end));
    cy.wait(sleep);
    cy.get('.add-endereco').click();

    //Finalizando sem adicionar cartão
    cy.wait(sleep);
    cy.get('.finalizar-compra a').click();

    //Adicionando um cartão para pagamento
    for(let i=0; i < cardTot; i++){
        cy.wait(sleep);
        cy.get('.add-card').click();
    }

    //Finalizando com o valor cartão menor do que R$ 10,00
    cy.wait(sleep);
    cy.get('.acoes .valor').first().clear().type('2');
    cy.wait(sleep);
    cy.get('.finalizar-compra a').click();

    //Finalizando com o valor cartão diferente do total
    cy.wait(sleep);
    cy.get('.acoes .valor').first().clear().type('15');
    cy.wait(sleep);
    cy.get('.finalizar-compra a').click();
    cy.wait(sleep);

    cy.reload();

    //Finalizando a compra
    cy.wait(sleep);
    cy.get('.finalizar-compra a').click();
    cy.wait(sleep);

    //Verificando todos os alerts
    cy.wrap(alerts).should(stub => {
        expect(stub.getCall(0)).to.be.calledWith('Confirme o endereço para finalizar a compra');
        expect(stub.getCall(1)).to.be.calledWith('Adicione um cartão para finalizar a compra.');
        expect(stub.getCall(2)).to.be.calledWith('Valor a ser pago no cartão precisa ser maior ou igual a R$ 10,00.');
        expect(stub.getCall(3)).to.be.calledWith('O valor a ser pago no cartão precisa ser igual ao valor total da compra.');
        expect(stub.getCall(4)).to.be.calledWith('Compra realizada com sucesso!');
    });
});

//Finalizando a compra
Cypress.Commands.add('finalizarCompraCupom', (end=9, totCard=1, totCup=1, sleep=time) => {

    // Verificando o alert
    cy.on('window:alert', msg => {
        expect(msg).to.contains('Compra realizada com sucesso!');
    });

    //Visitando a página de pagamento
    cy.visit('/pagamento');

    //Escolhendo o endereço
    cy.wait(sleep);
    cy.get('#endereco').select(String(end));
    cy.wait(sleep);
    cy.get('.add-endereco').click();

    //Adicionando um cartão para pagamento
    for(let i=0; i < totCard; i++){
        cy.wait(sleep);
        cy.get('.add-card').click();
    }

    for(let i=0; i < totCup; i++){
        cy.wait(sleep);
        cy.get('.add-cupom').click();
    }

    //Finalizando a compra
    cy.wait(sleep);
    cy.get('.finalizar-compra a').click();

    //Mostrando os pedidos
    cy.wait(sleep);
});


//Adicionandno itens ao carrinho
Cypress.Commands.add('adicionarCarrinhoId', (lvr_id, lvr_qtd=1, sleep=time) => {

    //Visitando a página principal
    cy.visit('/');

    //Abrindo o livro
    cy.wait(sleep);
    cy.get('.book-id').each($id => {
        if($id.text().trim() === String(lvr_id)){
            cy.wrap($id).closest('.book').then($book => {
                cy.wrap($book).find('.imagem').click();
            });
        }
    });

    //Definindo a qtd do livro a ser comprado
    cy.wait(sleep);
    cy.get('#contador').then($cont => {
        $cont.text(lvr_qtd);
    });

    //Adicionando o livro ao carrinho
    cy.wait(sleep);
    cy.get('.carrinho').click();
    cy.wait(sleep);

});


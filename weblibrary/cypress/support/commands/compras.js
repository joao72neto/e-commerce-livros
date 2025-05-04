
//Abrindo um livro por id
Cypress.Commands.add('comprarLivroId', (lvr_id, sleep=2000) => {

    //Visitando a página principal do e-commerce
    cy.visit('/');

    //Abrindo o livro
    cy.wait(sleep);
    cy.contains('.book-id', lvr_id).siblings('.imagem').click();

     //Clicando no botão de compra
     cy.wait(sleep);
     cy.get('.comprar').click();
});

//Finalizando a compra
Cypress.Commands.add('finalizarCompra', (end, cardTot=1, sleep=2000) => {

    //Visitando a página de pagamento
    cy.visit('/pagamento');

    //Escolhendo o endereço
    cy.wait(sleep);
    cy.get('#endereco').select(String(end));

    //Adicionando um cartão para pagamento
    for(let i=0; i < cardTot; i++){
        cy.wait(sleep);
        cy.get('.add-card').click();
    }

    //Finalizando a compra
    cy.wait(sleep);
    cy.get('.finalizar-compra a').click();

    // Verificando o alert
    cy.on('window:alert', msg => {
        expect(msg).to.contains('Compra realizada com sucesso!');
    });
});

//Adicionandno itens ao carrinho
Cypress.Commands.add('adicionarCarrinhoId', (lvr_id, sleep=2000) => {

    //Visitando a página principal
    cy.visit('/');

    //Abrindo o livro
    cy.wait(sleep);
    cy.contains('.book-id', lvr_id).siblings('.imagem').click();

    //Adicionando o livro ao carrinho
    cy.wait(sleep);
    cy.get('.carrinho').click();
    cy.wait(sleep);

});


const sleep = 2000;

//Abrindo um livro por id
Cypress.Commands.add('comprarLivroId', (lvr_id) => {

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
Cypress.Commands.add('finalizarCompra', () => {

    //Visitando a página de pagamento
    cy.visit('/pagamento');

    //Escolhendo o endereço
    cy.wait(sleep);
    cy.get('#endereco').select('10');

    //Adicionando um cartão para pagamento
    cy.wait(sleep);
    cy.get('.add-card').click();

    //Finalizando a compra
    cy.wait(sleep);
    cy.get('.finalizar-compra a').click();

    // Verificando o alert
    cy.on('window:alert', msg => {
        expect(msg).to.contains('Compra realizada com sucesso!');
    });

});



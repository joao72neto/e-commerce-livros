describe('Escolha de um livro para compra', () => {
 

    it('Deve adicionar o livro à tela de pagamento', () => {
        
        //Visitando a página principal do e-commerce
        cy.visit('/');

        //Id do livro que eu desejo clicar
        const lvr_id = 1;

        //Abrindo o livro
        cy.wait(1000);
        cy.contains('.book-id', lvr_id).siblings('.imagem').click();

        //Clicando no botão de compra
        cy.wait(1000);
        cy.get('.comprar').click();

    });

});

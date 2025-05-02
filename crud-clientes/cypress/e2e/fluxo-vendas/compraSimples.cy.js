describe('Escolha de um livro para compra', () => {
 

    it('Deve adicionar o livro à tela de pagamento', () => {
        
        //Visitando a página principal do e-commerce
        cy.visit('/');

        //Id do livro que eu desejo clicar
        const lvr_id = 1;

        //Abrindo o livro
        cy.wait(1500);
        cy.contains('.book-id', lvr_id).siblings('.imagem').click();

        //Clicando no botão de compra
        cy.wait(1500);
        cy.get('.comprar').click();

    });

    it('Deve finalizar o pagamento do livro', () => {
        
        //Visitando a página de pagamento
        cy.visit('/pagamento')

        //Escolhendo o endereço
        cy.wait(1500);
        cy.get('#endereco').select('2');

        //Adicionando um cartão para pagamento
        cy.wait(1500);
        cy.get('.add-card').click();

        //Finalizando a compra
        cy.wait(1500);
        cy.get('.finalizar-compra a').click();

        // Verificando o alert
        cy.on('window:alert', msg => {
            expect(msg).to.equal('Compra realizada com sucesso!');
        });

    });

});

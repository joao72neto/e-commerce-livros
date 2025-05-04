before(() => {
    cy.task('resetarBanco'); 
});

describe('Realizando o login do usuário no sistema', () => {

    it('Deve logar um usuário do sistema', () => {
        cy.logarUsuario();
    });
})

describe('Realizando a compra de um livro no sistema', () => {

    it('Deve adicionar um livro na tela de pagamente', () => {
        cy.comprarLivroId(1);
    });

    it('Deve finalizar o pagamento do livro', () => {
        cy.finalizarCompra();
    });

});
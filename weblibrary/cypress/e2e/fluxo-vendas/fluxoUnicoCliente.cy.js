const pause = false;
const standardSleep = 200;
const fastSleep = 200;

before(() => {
    cy.wait(1000);
    cy.task('resetarBanco'); 
    cy.wait(1000);
    
});

describe('Realizando o login do usuário no sistema', () => {

    it('Deve logar um usuário no sistema', () => {
        cy.logarUsuario(1, fastSleep);
        if (pause) cy.pause();
    });
});

describe('Realizando a compra de um livro no sistema', () => {

    it('Deve adicionar um livro na tela de pagamento', () => {
        cy.comprarLivroId(1, 10, standardSleep);
        if (pause) cy.pause();
    });

    it('Deve finalizar o pagamento do livro', () => {
        cy.finalizarCompra(1, 1, standardSleep);
        if (pause) cy.pause();
    });

});

describe('Realizando a compra de múltiplos livros', () => {

    it('Deve adicionar itens ao carrinho', () => {
        cy.adicionarCarrinhoId(2, 7, standardSleep);
        cy.adicionarCarrinhoId(3, 6, fastSleep);
        cy.adicionarCarrinhoId(4, 4, fastSleep);
        cy.adicionarCarrinhoId(5, 10, fastSleep);
        cy.adicionarCarrinhoId(6, 8, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve finalizar a compra de vários itens', () => {
        cy.finalizarCompra(2, 2, standardSleep);
        if (pause) cy.pause();
    });

});

describe('Gerenciar pedidos dos clientes', () => {

    it('Deve processar os pedidos dos clientes', () => {

        //Gerenciando os pedidos da Eduarda
        cy.aprovarPedidoId(15, standardSleep);
        cy.cancelarPedidoId(14, fastSleep);
        cy.aprovarPedidoId(13, fastSleep);
        cy.aprovarPedidoId(12, fastSleep);
        cy.aprovarPedidoId(11, fastSleep);
        cy.reprovarPedidoId(10, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve tratar as solicitações de devolução dos clientes', () => {

        //Tratando das devoluções da Eduarda
        cy.devolverLivroId(13, false, 1, standardSleep);
        cy.devolverLivroId(11, true, 4, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve tratar as solicitações de troca dos clientes', () => {
        cy.trocarLivroId(15, true, 2, standardSleep);
        if (pause) cy.pause();
    });

    it('Deve gerenciar os pedidos de devolução', () => {

        cy.aceitarTrocaId(15, standardSleep);
        cy.recusarDevolucaoId(13, fastSleep);
        cy.aceitarDevolucaoId(11, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve retornar ao estoque todos os itens aceitos para devolução', () => {

        cy.retornarEstoqueId(11, true, standardSleep);
        if (pause) cy.pause();
    });

    it('Deve retornar ao estoque todos os itens aceitos para troca', () => {
        
        cy.retornarEstoqueId(15, false, standardSleep);
        cy.exibirEstoque(standardSleep);
        if (pause) cy.pause();
    });
});

describe('Usando cupons recebidos pela troca de produtos', () => {

    it('Deve adicionar um livro ao pagamento', () => {

        //Visitando a tela principal
        cy.visit('/')
        cy.wait(standardSleep);
        cy.comprarLivroId(8, 12, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve finalizar a compra usando cupons', () => {
        cy.finalizarCompraCupom(2, 2, 2, standardSleep);
        if (pause) cy.pause();
    });

    it('Deve entregar o produto para o cliente', () => {
        cy.aprovarPedidoId(16, fastSleep);

        //Visitando a página de pedidos
        cy.visit('/pedidos');
        if (pause) cy.pause();

        //Voltando para a tela principal
        cy.visit('/');
    });
});
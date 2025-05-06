const pause = false;
const standardSleep = 500;
const fastSleep = 500;

before(() => {
    cy.wait(1000);
    cy.task('resetarBanco'); 
    cy.wait(1000);
    
});

describe('Realizando o login do usuário no sistema', () => {

    it('Deve logar um usuário do sistema', () => {
        cy.logarUsuario(5, fastSleep);
        if (pause) cy.pause();
    });
});

describe('Realizando a compra de um livro no sistema', () => {

    it('Deve adicionar um livro na tela de pagamente', () => {
        cy.comprarLivroId(1, 10, standardSleep);
        if (pause) cy.pause();
    });

    it('Deve finalizar o pagamento do livro', () => {
        cy.finalizarCompra(10, 1, standardSleep);
        if (pause) cy.pause();
    });

});

describe('Realizando a compra de múltiplos livros', () => {

    it('Deve adicionar itens ao carrinho', () => {
        cy.adicionarCarrinhoId(2, 4, standardSleep);
        cy.adicionarCarrinhoId(3, 2, fastSleep);
        cy.adicionarCarrinhoId(4, 1, fastSleep);
        cy.adicionarCarrinhoId(5, 20, fastSleep);
        cy.adicionarCarrinhoId(6, 3, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve finalizar a compra de vários itens', () => {
        cy.finalizarCompra(10, 2, standardSleep);
        if (pause) cy.pause();
    });

});

describe('Comprando livros com um outro cliente', () => {

    it('Deve logar o cliente corretamente', () => {
        cy.logarUsuario(1, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve adicioanr livros no carrinho', () => {
        cy.adicionarCarrinhoId(7, 20, standardSleep);
        cy.adicionarCarrinhoId(8, 10, fastSleep);
        cy.adicionarCarrinhoId(9, 5, fastSleep);
        cy.adicionarCarrinhoId(10, 3, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve finalizar a compra de todos os livros', () => {
        cy.finalizarCompra(2, 2, standardSleep);
        if (pause) cy.pause();
    });

});


describe('Gerenciar pedidos dos clientes', () => {

    it('Deve processar os pedidos dos clientes', () => {

        //Gerenciando os pedidos da Ana
        cy.aprovarPedidoId(10, standardSleep);
        cy.aprovarPedidoId(9, standardSleep);
        cy.reprovarPedidoId(8, fastSleep);
        cy.cancelarPedidoId(7, fastSleep);
        if (pause) cy.pause();

        //Gerenciando os pedidos da Eduarda
        cy.logarUsuario(5, fastSleep);
        cy.aprovarPedidoId(6, standardSleep);
        cy.cancelarPedidoId(5, standardSleep);
        cy.aprovarPedidoId(4, fastSleep);
        cy.aprovarPedidoId(3, fastSleep);
        cy.aprovarPedidoId(2, fastSleep);
        cy.reprovarPedidoId(1, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve tratar as solicitações de troca dos clientes', () => {

        //Tratando das devoluções da Ana
        cy.logarUsuario(1, fastSleep);
        cy.devolverLivroId(10, true, 2, standardSleep);
        cy.devolverLivroId(9, false, 1, fastSleep);
        if (pause) cy.pause();

        //Tratando das devoluções da Eduarda
        cy.logarUsuario(5, fastSleep);
        cy.devolverLivroId(6, true, 1, standardSleep);
        cy.devolverLivroId(4, false, 1, fastSleep);
        cy.devolverLivroId(2, false, 1, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve gerenciar os pedidos de devolução', () => {

        cy.aceitarDevolucaoId(10, standardSleep);
        cy.recusarDevolucaoId(9, fastSleep);
        cy.aceitarDevolucaoId(6, fastSleep);
        cy.recusarDevolucaoId(4, fastSleep);
        cy.aceitarDevolucaoId(2, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve retornar todos os itens aceitos para o estoque', () => {

        cy.retornarEstoqueId(6, standardSleep);
        cy.retornarEstoqueId(2, fastSleep);
        cy.retornarEstoqueId(10, fastSleep);
        cy.exibirEstoque(standardSleep);
        if (pause) cy.pause();
    })
});

describe('Usando cupons recebidos pela troca de produtos', () => {

    it('Deve adicionar um livro ao pagamento', () => {

        //Visitando a tela principal
        cy.visit('/')
        cy.wait(standardSleep);
        cy.comprarLivroId(7, 20, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve finalizar a compra usando cupons', () => {
        cy.finalizarCompraCupom(10, 2, 2, standardSleep);
        if (pause) cy.pause();
    });

    it('Deve entregar o produto para o cliente', () => {
        cy.aprovarPedidoId(11, fastSleep);

        //Visitando a página de pedidos
        cy.visit('/pedidos');
        if (pause) cy.pause();

        //Voltando para a tela principal
        cy.visit('/');
    });
});
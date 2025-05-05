before(() => {
    cy.wait(1000);
    cy.task('resetarBanco'); 
    cy.wait(1000);
    
});

describe('Realizando o login do usuário no sistema', () => {

    it('Deve logar um usuário do sistema', () => {
        cy.logarUsuario();
    });
});

describe('Realizando a compra de um livro no sistema', () => {

    it('Deve adicionar um livro na tela de pagamente', () => {
        cy.comprarLivroId(1);
    });

    it('Deve finalizar o pagamento do livro', () => {
        cy.finalizarCompra();
    });

});

describe('Realizando a compra de múltiplos livros', () => {

    it('Deve adicionar itens ao carrinho', () => {
        cy.adicionarCarrinhoId(2);
        cy.adicionarCarrinhoId(3, 500);
        cy.adicionarCarrinhoId(4, 500);
        cy.adicionarCarrinhoId(5, 500);
        cy.adicionarCarrinhoId(6, 500);
    });

    it('Deve finalizar a compra de vários itens', () => {
        cy.finalizarCompra(10, 2);
    })

});

describe('Gerenciar pedidos dos clientes', () => {

    it('Deve processar os pedidos dos clientes', () => {

        //Cancelando o pedido do livro 1 
        cy.aprovarPedidoId(6);
        cy.cancelarPedidoId(5);
        cy.aprovarPedidoId(4, 500);
        cy.reprovarPedidoId(3, 500);
        cy.aprovarPedidoId(2, 500);
        cy.aprovarPedidoId(1, 500);
        cy.pause();
    });

    it('Deve tratar as solicitações de troca dos clientes', () => {
        cy.devolverLivroId(6);
        cy.devolverLivroId(4, 500);
        cy.devolverLivroId(2, 500);
    });

    it('Deve gerenciar os pedidos de devolução', () => {
        cy.aceitarDevolucaoId(6);
        cy.recusarDevolucaoId(4);
        cy.aceitarDevolucaoId(2, 500);
    });

    it('Deve retornar todos os itens aceitos para o estoque', () => {
        cy.retornarEstoqueId(6);
        cy.retornarEstoqueId(2, 500);
        cy.exibirEstoque(3000);
    })
});

describe('Usando cupons recebidos pela troca de produtos', () => {

    it('Deve adicionar um livro ao pagamento', () => {

        //Visitando a tela principal
        cy.visit('/')
        cy.wait(2000);
        cy.comprarLivroId(7, 500);
    });

    it('Deve finalizar a compra usando cupons', () => {
        cy.finalizarCompraCupom(10, 1, 2);
    });

    it('Deve entregar o produto para o cliente', () => {
        cy.aprovarPedidoId(7, 500);

        //Visitando a página de pedidos
        cy.visit('/pedidos')
        cy.wait(2000);

        //Voltando para a tela principal
        cy.visit('/');
    })

});
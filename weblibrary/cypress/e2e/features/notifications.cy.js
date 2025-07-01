const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Realizando operações que retornam notificações', () => {

    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
        
    });

    it('Deve logar um usuário no sistema', () => {
        cy.logarUsuario(5, fastSleep);
        if (pause) cy.pause();
    });

    it('Comprando um livro a partir da busca', () => {
        cy.comprarLivroNome('O Nome do Vento', 2, fastSleep);
        cy.finalizarCompra(9, 1, fastSleep);
        if (pause) cy.pause();
    });

    it('Fechando notificação de pedido em processamento', () => {
        cy.closeNotification(fastSleep);
        if (pause) cy.pause();
    });

    it('Deve entregar o pedido e gerar 3 notificações', () => {
        cy.aprovarPedidoId(1, fastSleep);

        for(let i=0; i < 3; i++){
            cy.closeNotification(fastSleep);
        }

        if (pause) cy.pause();
    });

    it('Deve solicitar troca e gerar 1 notificação', () => {
        cy.trocarLivroId(1, false, 1, fastSleep);
        cy.closeNotification(fastSleep);
        if (pause) cy.pause();
    });

    it('Deve retornar produto ao estoque e gerar 3 notificações', () => {
        cy.aceitarTrocaId(1, fastSleep);
        cy.retornarEstoqueId(1, false, fastSleep);

        for(let i=0; i < 2; i++){
            cy.closeNotification(fastSleep);
        }

        if (pause) cy.pause();
    });
});
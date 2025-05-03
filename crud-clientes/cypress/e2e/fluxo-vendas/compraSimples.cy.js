//Definindo o livro que participará do teste
const lvr_id = 1;

describe('Realizando a compra de um livro', () => {
 
    it('Deve adicionar o livro à tela de pagamento', () => {
        
        //Visitando a página principal do e-commerce
        cy.visit('/');

        //Abrindo o livro
        cy.wait(1500);
        cy.contains('.book-id', lvr_id).siblings('.imagem').click();

        //Clicando no botão de compra
        cy.wait(1500);
        cy.get('.comprar').click();

    });

    it('Deve finalizar o pagamento do livro', () => {
        
        //Visitando a página de pagamento
        cy.visit('/pagamento');

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
            expect(msg).to.contains('Compra realizada com sucesso!');
        });

    });

});

describe('Gerenciando os pedidos feitos pelo cliente', () => {

    //Testes
    it('Deve gerenciar a entrega do pedido', () => {

        //Página a ser visitada
        cy.visit('/pedidos/gerenciar');

        //Aprovando o pedido do usuário
        cy.wait(1500);
        cy.contains('.lvr-id', lvr_id).get('#processamento').select('Aprovado');

        //Mudando o stauts para em transporte
        cy.wait(1500);
        cy.contains('.lvr-id', lvr_id).get('#entrega').select('Em Transporte');

        //Mudando o status para enutregue
        cy.wait(1500);
        cy.contains('.lvr-id', lvr_id).get('#entrega').select('Entregue');
        cy.wait(1500);
    });
});

describe('Gerenciar a devolução de um livro', () => {

    it('Deve realizar a devolução do pedido solicitado', () => {

        //Obtendo todos os alerts
        const alerts = cy.stub();
        cy.on('window:alert', alerts);

        //Visatando a página de pedidos
        cy.visit('/pedidos');

        //Solicitando a devolução do produto
        cy.wait(1500);
        cy.contains('.book-id', lvr_id).get('.devolucao').first().click();

        //Voltando para a página de gerenciamento de pedidos
        cy.wait(1500);
        cy.visit('/pedidos/gerenciar');

        //Aceitando a solicitação da devolução
        cy.wait(1500);
        cy.contains('.lvr-id', lvr_id).get('#devolucao').select('Devolução Aceita'); 

        //Retornando o item para o estoque
        cy.wait(1500);
        cy.get('.devolucao .acoes a').first().click();

        //Confirmando o retorno do item para o estoque
        cy.wait(1500);
        cy.get('.submit button').click();

        //Verificando todos os alerts
        cy.wrap(alerts).should(stub => {
            expect(stub.getCall(0)).to.be.calledWith('devolucao solicitado(a) com sucesso!');
            expect(stub.getCall(1)).to.be.calledWith('Entrada adicionada com sucesso!');
        })

        //Redirecionando para a página de estoque
        cy.wait(1500);
        cy.visit('/estoque');
        cy.wait(1500);

    });

    it('Deve comprar um livro usando cupons de troca', () => {

        //Indo para a tela principal do e-commerce
        cy.visit('/');

    });
});

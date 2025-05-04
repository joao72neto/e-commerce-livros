//Definindo o livro que participará do teste
let lvr_id = 1;

describe('Realizando a compra de um livro', () => {
 
    it('Deve realizar login de um cliente', () => {

        //Visitando a página de clientes
        cy.visit('/clientes');

        //Logando com o cliente de id 1
        cy.wait(2000);
        cy.get('.login').first().click();

        //Esperando para voltar para a pǵina inicial
        cy.wait(2000);

    });

    it('Deve adicionar o livro à tela de pagamento', () => {
        
        //Visitando a página principal do e-commerce
        cy.visit('/');

        //Abrindo o livro
        cy.wait(2000);
        cy.contains('.book-id', lvr_id).siblings('.imagem').click();

        //Clicando no botão de compra
        cy.wait(2000);
        cy.get('.comprar').click();

    });

    it('Deve finalizar o pagamento do livro', () => {
        
        //Visitando a página de pagamento
        cy.visit('/pagamento');

        //Escolhendo o endereço
        cy.wait(2000);
        cy.get('#endereco').select('10');

        //Adicionando um cartão para pagamento
        cy.wait(2000);
        cy.get('.add-card').click();

        //Finalizando a compra
        cy.wait(2000);
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
        cy.wait(2000);
        cy.contains('.lvr-id', lvr_id).get('#processamento').select('Aprovado');
        cy.wait(2000);
        cy.visit('/pedidos');
        cy.wait(2000);

        //Mudando o stauts para em transporte
        cy.visit('/pedidos/gerenciar');
        cy.contains('.lvr-id', lvr_id).get('#entrega').select('Em Transporte');
        cy.wait(2000);
        cy.visit('/pedidos');
        cy.wait(2000);

        //Mudando o status para enutregue
        cy.visit('/pedidos/gerenciar');
        cy.contains('.lvr-id', lvr_id).get('#entrega').select('Entregue');
        cy.wait(2000);
    });
});

describe('Gerenciando a devolução de um livro', () => {

    it('Deve realizar a devolução do pedido solicitado', () => {

        //Obtendo todos os alerts
        const alerts = cy.stub();
        cy.on('window:alert', alerts);

        //Visatando a página de pedidos
        cy.visit('/pedidos');

        //Solicitando a devolução do produto
        cy.wait(2000);
        cy.contains('.book-id', lvr_id).get('.devolucao').first().click();

        //Voltando para a página de gerenciamento de pedidos
        cy.wait(2000);
        cy.visit('/pedidos/gerenciar');

        //Aceitando a solicitação da devolução
        cy.wait(2000);
        cy.contains('.lvr-id', lvr_id).get('#devolucao').select('Devolução Aceita'); 
        cy.wait(2000);
        cy.visit('/pedidos');
        cy.wait(2000);

        //Retornando o item para o estoque
        cy.visit('/pedidos/gerenciar');
        cy.wait(2000);
        cy.get('.devolucao .acoes a').first().click();

        //Confirmando o retorno do item para o estoque
        cy.wait(2000);
        cy.get('.submit button').click();
        cy.wait(2000);

        //Verificando o status da página de pedidos
        cy.visit('/pedidos');

        //Redirecionando para a página de estoque
        cy.wait(2000);
        cy.visit('/estoque');
        cy.wait(2000);

        //Verificando todos os alerts
        cy.wrap(alerts).should(stub => {
            expect(stub.getCall(0)).to.be.calledWith('devolucao solicitado(a) com sucesso!');
            expect(stub.getCall(1)).to.be.calledWith('Entrada adicionada com sucesso!');
        })

    });

    it('Deve comprar um livro usando cupons de troca', () => {

        //Indo para a página principal do e-commerce
        cy.visit('/');

        //Escolhendo outro livro para a compra
        lvr_id = 2;

        //Selecionando o livro
        cy.wait(2000);
        cy.contains('.book-id', lvr_id).siblings('.imagem').click();

        //Clicando no botão de compra
        cy.wait(2000);
        cy.get('.comprar').click();

        //Selecionando um endereço
        cy.wait(2000);
        cy.get('#endereco').select('9');

        //Adicionando dois cartões
        cy.wait(2000);
        cy.get('.add-card').click();
        cy.wait(2000);
        cy.get('.add-card').click();

        //Adicionando um cupom de troca no momento da compra
        cy.wait(2000);
        cy.get('.add-cupom').click();

        //Finalizando a compra
        cy.wait(2000);
        cy.get('.finalizar-compra a').click();

        // Verificando o alert da finalização da compra
        cy.on('window:alert', msg => {
            expect(msg).to.contains('Compra realizada com sucesso!');
        });

        cy.wait(2000);

    });
});

describe('Recusando um pedido feito pelo cliente', () => {

    it('Não deve aprovar o pedido feito pelo cliente', () => {

        //Visitando a página de gerenciamento de pedidos
        cy.visit('/pedidos/gerenciar');

        //Recusando ou cancelando o pedido
        cy.wait(2000);
        cy.contains('.lvr-id', lvr_id).get('#processamento').select('Reprovado');

        //Voltando para a página de pedidos
        cy.wait(2000);
        cy.visit('/pedidos');

    });
});

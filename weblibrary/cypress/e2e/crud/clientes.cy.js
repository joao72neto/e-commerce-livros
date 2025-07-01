const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Testes Relacionados a Operações com Clientes', () => {

    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
    });
  
    it('Deve Preencher e enviar o formulário de cadastro de clientes', () => {
        cy.logarUsuario(1);
        cy.cadastrarCliente(fastSleep);
        if (pause) cy.pause();
    });

    it('Deve preencher e submeter o formulário de alteração', () => {
        cy.alterarClienteId(6);
        if (pause) cy.pause();
    });

    it('Deve inativar e reativar um usuário corretamente', () => {
        cy.inativarReativarClienteId(2, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve mostrar o popups dos clientes corretamente', () => {
        cy.showPopupClient(1, fastSleep);
        cy.showPopupClient(3, fastSleep);
        cy.showPopupClient(4, fastSleep);
        cy.showPopupClient(5, fastSleep);
        if (pause) cy.pause();
    });
    
    it('Deve mostrar as transações dos usuários corretamente', () => {
        cy.showTransactions(1, fastSleep);
        cy.showTransactions(2, fastSleep);
        cy.showTransactions(5, fastSleep);
        cy.showTransactions(3, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve excluir um cliente corretamente', () => {
        cy.deleteClientById(2, fastSleep);
        cy.deleteClientById(3, fastSleep);
        cy.deleteClientById(6, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve testar todos os campos do filtro', () => {
        cy.filterClients();
        if (pause) cy.pause();
    });
});

  

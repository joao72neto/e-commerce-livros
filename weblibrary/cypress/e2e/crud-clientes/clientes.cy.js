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
        cy.wait(standardSleep);
    });

    it('Deve preencher e submeter o formulário de alteração', () => {
        cy.alterarClienteId(6);
        cy.wait(standardSleep);
    });

    it('Deve inativar e reativar um usuário corretamente', () => {
        cy.inativarReativarClienteId(2, fastSleep);
        cy.wait(standardSleep);
    });

    it('Deve mostrar o popups dos clientes corretamente', () => {
        cy.showPopup(1, fastSleep);
        cy.showPopup(3, fastSleep);
        cy.showPopup(4, fastSleep);
        cy.showPopup(5, fastSleep);
        cy.wait(standardSleep);
    });
    
    it('Deve mostrar as transações dos usuários corretamente', () => {
        cy.showTransactions(1, fastSleep);
        cy.showTransactions(2, fastSleep);
        cy.showTransactions(5, fastSleep);
        cy.showTransactions(3, fastSleep);
        cy.wait(standardSleep);
    });

    it('Deve excluir um cliente corretamente', () => {
        cy.deleteClientById(2, fastSleep);
        cy.deleteClientById(3, fastSleep);
        cy.deleteClientById(6, fastSleep);
        cy.wait(standardSleep);
    });

    it('Deve testar todos os campos do filtro', () => {
        cy.filterClients();
        cy.wait(standardSleep);
    });
});

  

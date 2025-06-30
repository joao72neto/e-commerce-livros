const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Testes Relacionados a Operações com Clientes', () => {

    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
    });
  
    it('Deve Preenche e envia o formulário de cadastro de clientes', () => {
        cy.cadastrarCliente(fastSleep);
        cy.visit('/clientes');
        cy.wait(standardSleep);
    });

    it('Deve preencher e submeter o formulário de alteração', () => {
        cy.alterarClienteId(6);
        cy.visit('/clientes');
        cy.wait(standardSleep);
    });
});

  

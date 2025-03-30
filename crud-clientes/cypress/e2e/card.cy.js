describe('Teste Relacionados a Operações com Cartões', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve preencher e submeter o formulário de adição de cartão', () => {
      // Acessando a tela de adição de cartão
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/clientes/card"]').click();
      cy.get('.card-add').click();
  
      // Preenchendo os campos do formulário 
      cy.get('#numero_cartao').clear().type('1234123412341234');
      cy.get('#nome_cartao').clear().type('João Silva');
      cy.get('#bandeira_cartao').clear().type('Visa');
      cy.get('#codigo_seguranca').clear().type('123');
  
      // Clicando no botão de adicionar
      cy.get('button').click();

      //Verificando se a msg de cadastro está sendo exibida corretamente
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cartão foi cadastrado com sucesso!');
      });

    });

    it('Deve preencher e submeter o formulário de alteração de cartão', () => {
      // Acessando a tela de alteração de cartão
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/clientes/card"]').click();
      cy.get('.acoes-card .alt').first().click(); // Botão para editar o cartão
  
      // Limpando e preenchendo novos dados no formulário
      cy.get('#numero_cartao').clear().type('9876987698769876');
      cy.get('#nome_cartao').clear().type('João Pereira');
      cy.get('#bandeira_cartao').clear().type('Mastercard');
      cy.get('#codigo_seguranca').clear().type('456');
  
      // Clicando no botão de salvar alterações
      cy.get('button').click();

      //Verificando se a msg de alteração de dados está sendo exibida corretamente
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cartão foi atualizado com sucesso!');
      });
    });

    it('Deve excluir um cartão corretamente', () => {

      Cypress.on('uncaught:exception', () => false);

      // Acessando a tela de alteração de cartão
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/clientes/card"]').click();

      //Clicando no botão de excluir 
      cy.get('.acoes-card .delete').first().click(); 
  
      // Confirmando a exclusão
      cy.on('window:confirm', () => true);

      //Clicando no botão de excluir 
      cy.get('.acoes-card .delete').first().click(); 
  
    });
});

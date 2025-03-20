describe('Teste de Cadastro de Cartão', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('Deve preencher e submeter o formulário de adição de cartão', () => {
      // Acessando a tela de adição de cartão
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/card"]').click();
      cy.get('.card-add').click()
  
      // Preenchendo os campos do formulário 
      cy.get('input[name="numero_cartao"]').type('1234123412341234');
      cy.get('input[name="nome_cartao"]').type('JOAO SILVA');
      cy.get('input[name="bandeira_cartao"]').type('Visa');
      cy.get('input[name="codigo_seguranca"]').type('123');
  
      // Clicando no botão de adicionar
      cy.get('button').click();

      //Verificando se a msg de cadastro está sendo exibida corretamente
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cartão foi cadastrado com sucesso!');
      });

    });
});

describe('Teste de Alteração de Cartão', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('Deve preencher e submeter o formulário de alteração de cartão', () => {
      // Acessando a tela de alteração de cartão
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/card"]').click();
      cy.get('.acoes-card .alt').first().click(); // Botão para editar o cartão
  
      // Limpando e preenchendo novos dados no formulário
      cy.get('input[name="numero_cartao"]').clear().type('9876987698769876');
      cy.get('input[name="nome_cartao"]').clear().type('JOAO PEREIRA');
      cy.get('input[name="bandeira_cartao"]').clear().type('Mastercard');
      cy.get('input[name="codigo_seguranca"]').clear().type('456');
  
      // Clicando no botão de salvar alterações
      cy.get('button').click();

      //Verificando se a msg de alteração de dados está sendo exibida corretamente
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cartão foi atualizado com sucesso!');
      });
 
    });
});
  
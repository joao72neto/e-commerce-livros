describe('Teste de Cadastro de Endereço', () => {
    beforeEach(() => {
      cy.visit('/'); // Ajuste a URL conforme necessário
    });
  
    it('Deve preencher e submeter o formulário de adição de endereço', () => {
  
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/address"]').click();
      cy.get('.endereco-add .add').first().click();
  
      cy.get('#tipo_residencia').type('Apartamento');
      cy.get('#tipo_logradouro').type('Rua');
      cy.get('#logradouro').type('Avenida Paulista');
      cy.get('#numero').type('1000');
      cy.get('#bairro').type('Bela Vista');
      cy.get('#cep').type('01311000');
      cy.get('#cidade').type('São Paulo');
      cy.get('#estado').type('SP');
      cy.get('#pais').type('Brasil');
      cy.get('#observacoes').type('Endereço principal para cobrança');
  
      cy.get('button').click();
      cy.get('.voltar').click();
      cy.get('.voltar').click();
   
  
    });
  });

  describe('Teste de alteração de endereço', () => {
    beforeEach(() => {
        cy.visit('/'); // Ajuste conforme a URL da sua aplicação
    });
  
    it('Deve preencher e alterar um endereço existente', () => {
  
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/address"]').click();
        cy.get('.acoes-address .alt').first().click();
  
        // Preenchendo os campos do formulário com novos valores
        cy.get('#tipo_residencia').clear().type('Casa');
        cy.get('#tipo_logradouro').clear().type('Rua');
        cy.get('#logradouro').clear().type('Avenida Paulista');
        cy.get('#numero').clear().type('1234');
        cy.get('#bairro').clear().type('Centro');
        cy.get('#cep').clear().type('01000000');
        cy.get('#cidade').clear().type('São Paulo');
        cy.get('#estado').clear().type('SP');
        cy.get('#pais').clear().type('Brasil');
        cy.get('#observacoes').clear().type('Perto do metrô.');
  
        // Clicando no botão Alterar
        cy.contains('button', 'Alterar').click();
  
        cy.get('.voltar').click();
        cy.get('.voltar').click();
  
    });
  });
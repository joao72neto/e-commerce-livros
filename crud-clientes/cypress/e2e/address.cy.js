describe('Teste de Cadastro de Endereço', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('Deve preencher e submeter o formulário de adição de endereço', () => {
        
        // Indo até a página de cadastro de endereço
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/address"]').click();
        cy.get('.endereco-add .add').first().click();

        // Preenchendo os dados
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

        // Cadastrando
        cy.get('button').click();

        // Voltando para a página principal
        cy.get('.voltar').click();
        cy.get('.voltar').click();

  
    });
});

describe('Teste de alteração de endereço', () => {
    beforeEach(() => {
        cy.visit('/'); 
    });
  
    it('Deve preencher e alterar um endereço existente', () => {
  
        // Indo até a página de alteralção de endereço
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
  
        //Voltando para a página inicial
        cy.get('.voltar').click();
        cy.get('.voltar').click();
  
    });
});

describe('Teste de Exibição de Popup', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('Deve mostrar o popup do cliente corretamente', () => {
        
        //Indo para a págine de endereços
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/address"]').click();
        
        //Clicando no primeiro endereço
        cy.get('.endereco').first().click();

        //Fechando o popup caso ele seja exibido
        cy.get('.popup button').should('exist').click();

    });
});
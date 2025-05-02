describe('Teste Relacionados a Operações com Cartões', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });

    it('Deve Preenche e envia o formulário de cadastro de cliente', () => {
    
      // Indo para a página de cadastro de cliente
      cy.get('a[href^="/clientes/signup"]').click();

      // Preenchendo os dados do cliente
      cy.get('#nome').type('João da Silva');
      cy.get('#email').type('joao.teste@email.com');
      cy.get('#telefone').type('+55 11 99999-9999');
      cy.get('#cpf').type('123.456.789-00');
      cy.get('#gen01').check(); 
      cy.get('#data').type('1990-05-02');
      cy.get('#senha').type('novaSenha123@');
      cy.get('#confirma_senha').type('novaSenha123@');

      // Preenchendo os dados do endereço do cliente
      cy.get('#tipo_residencia').type('Apartamento');
      cy.get('#tipo_logradouro').type('Rua');
      cy.get('#logradouro').type('Av. Paulista');
      cy.get('#numero').type('123');
      cy.get('#bairro').type('Centro');
      cy.get('#cep').type('01000-000');
      cy.get('#cidade').type('São Paulo');
      cy.get('#estado').type('SP');
      cy.get('#pais').type('Brasil');
      cy.get('#observacoes').type('Cliente VIP');

      // Preenchendo os dados do catão do cliente
      cy.get('#numero_cartao').type('4111111111111111');
      cy.get('#nome_cartao').type('João da Silva');
      cy.get('#bandeira_cartao').type('Visa');
      cy.get('#codigo_seguranca').type('123');

      // Confirmando 
      cy.get('button[type="submit"]').click();

      //Verificando se a msg de cadastro está sendo exibida corretamente
      cy.on('window:alert', (alertText) => {
          expect(alertText).to.contains('Cliente foi Cadastrado com Sucesso!');
      });

      cy.wait(1000);
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

    it('Deve excluir um cliente corretamente', () => {
  
      // Inativando um cliente
      cy.get('.acoes .inat').first().click();
      cy.get('#btn-inativados').should('exist').click();

      // Excluindo o cliente
      cy.get('.btn-delete').click();
      cy.on('window:confirm', () => true);

      //Confirmando a exclusão
      cy.get('h1').should('have.text', 'Nenhum Cliente Inativo');
      cy.get('.voltar').click();
      cy.get('h1').should('have.text', 'Nenhum Cliente Ativo');
  });
});

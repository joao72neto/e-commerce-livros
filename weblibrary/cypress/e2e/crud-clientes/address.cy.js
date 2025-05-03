describe('Testes Relacionados a Operações com Endereços', () => {
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

    it('Deve preencher e submeter o formulário de adição de endereço', () => {
        
        // Indo até a página de cadastro de endereço
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/address"]').click();
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

        //Verificando se a msg de cadastro está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Endereço foi cadastrado com sucesso!');
        });
    });

    it('Deve preencher e alterar um endereço existente', () => {
  
        // Indo até a página de alteralção de endereço
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/address"]').click();
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

        //Verificando se a msg de alteração de dados está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Endereço foi atualizado com sucesso!');
        });
    });

    it('Deve mostrar o popup do cliente endereço', () => {
        
        //Indo para a págine de endereços
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/address"]').click();
        
        //Clicando no primeiro endereço
        cy.get('.endereco').first().click();

        //Fechando o popup caso ele seja exibido
        cy.get('.popup button').should('exist').click();

    });

    it('Deve excluir um endereço corretamente', () => {

        Cypress.on('uncaught:exception', () => false);
  
        // Acessando a tela de alteração de cartão
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/address"]').click();
  
        //Clicando no botão de excluir 
        cy.get('.acoes-address .delete').first().click(); 
    
        // Confirmando a exclusão
        cy.on('window:confirm', () => true);
  
        //Clicando no botão de excluir 
        cy.get('.acoes-address .delete').first().click(); 
    
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

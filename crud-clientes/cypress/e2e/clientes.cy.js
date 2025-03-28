describe('Teste de Cadastro de Dados dos Clientes', () => {

    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Preenche e envia o formulário de cadastro', () => {
    
        // Indo para a página de cadastro de cliente
        cy.get('a[href="/clientes/signup"]').click();
  
        // Preenchendo os dados do cliente
        cy.get('#nome').type('João da Silva');
        cy.get('#email').type('joao.teste@email.com');
        cy.get('#telefone').type('5511999999999');
        cy.get('#cpf').type('12345678900');
        cy.get('#gen01').check(); 
        cy.get('#data').type('1990-05-15');
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
        cy.get('[name="numero_cartao"]').type('4111111111111111');
        cy.get('[name="nome_cartao"]').type('João da Silva');
        cy.get('[name="bandeira_cartao"]').type('Visa');
        cy.get('[name="codigo_seguranca"]').type('123');
  
        // Confirmando 
        cy.get('button[type="submit"]').click();

        //Verificando se a msg de cadastro está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Cliente foi Cadastrado com Sucesso!');
        });
    });
});

describe('Teste de Alteração de Dados do Cliente', () => {
    beforeEach(() => {
        cy.visit('/clientes'); 
    });
  
    it('Deve preencher e submeter o formulário de alteração', () => {
  
        // Indo para a página de alteração de cliente
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/signup"]').click();

        // Modificando os dados do cliente
        cy.get('#nome').clear().type('Novo Nome');
        cy.get('#email').clear().type('novoemail@example.com');
        cy.get('#telefone').clear().type('5511999999999');
        cy.get('#cpf').clear().type('09846758465');
        cy.get('#gen01').check();
        cy.get('#data').clear().type('1990-01-01');
        cy.get('#senha').clear().type('novaSenha123@');
        cy.get('#confirma_senha').clear().type('novaSenha123@');
        
        // Modificando o endereço do cliente
        cy.get('#tipo_residencia').clear().type('Apartamento');
        cy.get('#tipo_logradouro').clear().type('Rua');
        cy.get('#logradouro').clear().type('Nova Rua');
        cy.get('#numero').clear().type('123');
        cy.get('#bairro').clear().type('Centro');
        cy.get('#cep').clear().type('12345678');
        cy.get('#cidade').clear().type('São Paulo');
        cy.get('#estado').clear().type('SP');
        cy.get('#pais').clear().type('Brasil');
        cy.get('#observacoes').clear().type('Cliente VIP');
        
        // Modificando o cartão do cliente
        cy.get('input[name="numero_cartao"]').clear().type('4111111111111111');
        cy.get('input[name="nome_cartao"]').clear().type('Novo Nome');
        cy.get('input[name="bandeira_cartao"]').clear().type('Visa');
        cy.get('input[name="codigo_seguranca"]').clear().type('123');
        
        // Confirmando as alterações
        cy.get('button[type="submit"]').click();

        //Verificando se a msg de atualização de dados está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Cliente foi atualizado com sucesso!');
        }); 
    });
});

describe('Teste de Inativação e Reativação de Usuário', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve inativar e reativar um usuário corretamente', () => {
  
        // Inativando um cliente
        cy.get('.acoes .inat').first().click();

        // Indo para a página de inativos
        cy.get('#btn-inativados').should('exist').click();

        // Reativando o cliente
        cy.get('.btn-inat').click();
    });
});

describe('Teste de Exibição de Popup', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve mostrar o popup do cliente corretamente', () => {
        
        //Clicando no primeiro cliente
        cy.get('.cliente').first().click();

        //Fechando o popup caso ele seja exibido
        cy.get('.popup button').should('exist').click();

    });
});
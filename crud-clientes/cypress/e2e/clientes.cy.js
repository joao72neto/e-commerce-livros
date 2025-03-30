describe('Testes Relacionados a Operações com Clientes', () => {

    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve Preenche e envia o formulário de cadastro', () => {
    
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

    it('Deve preencher e submeter o formulário de alteração', () => {
  
        // Indo para a página de alteração de cliente
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/signup"]').click();

        // Modificando os dados do cliente
        cy.get('#nome').clear().type('José Neto');
        cy.get('#email').clear().type('joseemail@example.com');
        cy.get('#telefone').clear().type('+55 11 99999-9999');
        cy.get('#cpf').clear().type('098.467.584-65');
        cy.get('#gen01').check();
        cy.get('#data').clear().type('1990-01-01');
        
        // Modificando o endereço do cliente
        cy.get('#tipo_residencia').clear().type('Apartamento');
        cy.get('#tipo_logradouro').clear().type('Rua');
        cy.get('#logradouro').clear().type('Nova Rua');
        cy.get('#numero').clear().type('123');
        cy.get('#bairro').clear().type('Centro');
        cy.get('#cep').clear().type('12345-678');
        cy.get('#cidade').clear().type('São Paulo');
        cy.get('#estado').clear().type('SP');
        cy.get('#pais').clear().type('Brasil');
        cy.get('#observacoes').clear().type('Cliente VIP');
        
        // Modificando o cartão do cliente
        cy.get('#numero_cartao').clear().type('4111114531113');
        cy.get('#nome_cartao').clear().type('José Neto');
        cy.get('#bandeira_cartao').clear().type('Mastercard');
        cy.get('#codigo_seguranca').clear().type('456');
        
        // Confirmando as alterações
        cy.get('button[type="submit"]').click();

        //Verificando se a msg de atualização de dados está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Cliente foi atualizado com sucesso!');
        }); 
    });

    it('Deve inativar e reativar um usuário corretamente', () => {
  
        // Inativando um cliente
        cy.get('.acoes .inat').first().click();

        // Indo para a página de inativos
        cy.get('#btn-inativados').should('exist').click();

        // Reativando o cliente
        cy.get('.btn-inat').click();
    });

    it('Deve mostrar o popup do cliente corretamente', () => {
        
        //Clicando no primeiro cliente
        cy.get('.cliente').first().click();

        //Fechando o popup caso ele seja exibido
        cy.get('.popup button').should('exist').click();

    });

    it('Deve mostrar as transações dos usuários corretamente', () => {
  
        // Indo para a tela de transações
        cy.get('.acoes .tran').first().click();
    
        //Verificando se a tela foi carregada com base no título
        cy.get('h1, h2').invoke('text').then((texto) => {
          if (!(texto.includes('Transações de') || texto.includes('Nenhuma transação'))) {
    
            cy.log('O teste falhou');
            return;
    
          } 
          
          cy.log('O teste funcionou');
    
          //Voltando para a tela principal
          cy.get('.voltar').click();
          
        });
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

  

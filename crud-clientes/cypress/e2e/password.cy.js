describe('Testes Relacionados a Alteração de Senha', () => {
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
  
    it('Deve permitir a recuperação de senha', () => {

        // Indo para a página de recuperação de senha
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/password"]').click();

        // Preenche os campos do formulário
        cy.get('.senha-atual').type('novaSenha123@'); 
        cy.get('.senha-nova').type('NOVAsenha123@');   
        cy.get('.senha-rep').type('NOVAsenha123@');    

        // Submete o formulário
        cy.get('form').submit();

        // Verifica se a senha foi alterada com sucesso
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Senha alterada com sucesso!');
        });

        // Confirmando se a página foi recarregada
        cy.reload();
    });
  
    it('Deve exibir alerta de erro se a senha atual estiver incorreta', () => {
  
        // Indo para a página de recuperação de senha
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/password"]').click();

        // Preenche os campos do formulário com senha atual incorreta
        cy.get('.senha-atual').type('senhaErrada123@');  
        cy.get('.senha-nova').type('novaSenha123@');     
        cy.get('.senha-rep').type('novaSenha123@');      

        // Submete o formulário
        cy.get('form').submit();

        // Verifica se o alerta de erro aparece
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Senha não bate com a atual cadastrada no banco');
        });
    });
  
    it('Deve exibir alerta de erro se as senhas não coincidirem', () => {
  

        //Indo para a página de recuperação de senha
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/password"]').click();

        // Preenche com a senha atual correta, mas senhas novas diferentes
        cy.get('.senha-atual').type('NOVAsenha123@');  
        cy.get('.senha-nova').type('novaSenha123@');    
        cy.get('.senha-rep').type('senhaDiferente123@'); 

        // Submete o formulário
        cy.get('form').submit();

        // Verifica se o alerta de erro aparece
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('A senha não bate com a sua repetição');
        });
    
    });
  
    it('Deve exibir alerta de erro se campos estiverem vazios', () => {
  
     
        //Indo para a página de recuperação de senha
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/password"]').click();

        // Deixa campos vazios
        cy.get('.senha-atual').type('NOVAsenha123@'); 
        cy.get('.senha-nova').clear();
        cy.get('.senha-rep').clear();

        // Submete o formulário
        cy.get('form').submit();

        // Verifica se o alerta de erro aparece
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Preencha os campos vazios');
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
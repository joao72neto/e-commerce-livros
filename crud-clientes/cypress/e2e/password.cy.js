describe('Testes Relacionados a Alteração de Senha', () => {
    beforeEach(() => {
        cy.visit('/clientes'); 
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
});
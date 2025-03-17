describe('Teste de Recuperação de Senha', () => {
    beforeEach(() => {
  
      // Visita a página de recuperação de senha
      cy.visit('/'); 
  
    });
  
    it('Deve permitir a recuperação de senha', () => {
  
      //Indo para a página de recuperação de senha
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/password"]').click();
  
      // Preenche os campos do formulário
      cy.get('.senha-atual').type('novaSenha123');  // Senha atual
      cy.get('.senha-nova').type('novaSenha123');   // Nova senha
      cy.get('.senha-rep').type('novaSenha123');    // Repete a nova senha
  
      // Submete o formulário
      cy.get('form').submit();
  
      // Verifica se a senha foi alterada com sucesso
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Senha alterada com sucesso!');
      });
  
      // Confirma se a página foi recarregada após a alteração da senha
      cy.reload();
    });
  
    it('Deve exibir alerta de erro se a senha atual estiver incorreta', () => {
  
      //Indo para a página de recuperação de senha
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/password"]').click();
  
      // Preenche os campos do formulário com senha incorreta
      cy.get('.senha-atual').type('senhaErrada123');  // Senha atual errada
      cy.get('.senha-nova').type('novaSenha123');     // Nova senha
      cy.get('.senha-rep').type('novaSenha123');      // Repete a nova senha
  
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
      cy.get('.alt_submenu a[href^="/password"]').click();
  
      // Preenche os campos do formulário com senha correta, mas senhas novas diferentes
      cy.get('.senha-atual').type('novaSenha123');  // Senha atual
      cy.get('.senha-nova').type('novaSenha123');    // Nova senha
      cy.get('.senha-rep').type('senhaDiferente123'); // Repete senha diferente
  
      // Submete o formulário
      cy.get('form').submit();
  
      // Verifica se o alerta de erro aparece
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Repetição da senha diferente da senha nova');
      });
    });
  
    it('Deve exibir alerta de erro se campos estiverem vazios', () => {
  
      //Indo para a página de recuperação de senha
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/password"]').click();
  
      // Deixa os campos vazios
      cy.get('.senha-atual').type('novaSenha123'); 
      cy.get('.senha-nova').clear();
      cy.get('.senha-rep').clear();
  
      // Submete o formulário
      cy.get('form').submit();
  
      // Verifica se o alerta de erro aparece
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Campos estão vazios');
      });
    });
  });
  
  
  
  
  
  
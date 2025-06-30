const time = 1500;

//Recovering password
Cypress.Commands.add('recuperarSenha', (clt_id, sleep=time) => {

    // Indo para a página de recuperação de senha
    cy.visit(`/clientes/password/${clt_id}`);

    // Preenche os campos do formulário
    cy.get('.senha-atual').type('novaSenha123@');
    cy.get('.senha-nova').type('NOVAsenha123@');
    cy.get('.senha-rep').type('NOVAsenha123@');

    // Submete o formulário
    cy.get('button').click();

    // Verifica se a senha foi alterada com sucesso
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Senha alterada com sucesso!');
    });

    // Confirmando se a página foi recarregada
    cy.wait(sleep);
    cy.visit('/clientes');
    cy.wait(sleep);
});

//Recovering password
Cypress.Commands.add('senhaAtualIncorretaMsg', (clt_id, sleep=time) => {

    // Indo para a página de recuperação de senha
    cy.visit(`/clientes/password/${clt_id}`);

    // Preenche os campos do formulário
    cy.get('.senha-atual').type('senhaErrada123@');  
    cy.get('.senha-nova').type('novaSenha123@');     
    cy.get('.senha-rep').type('novaSenha123@'); 

    // Submete o formulário
    cy.get('button').click();

    // Verifica se o alerta de erro aparece
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Senha não bate com a atual cadastrada no banco');
    });

    // Confirmando se a página foi recarregada
    cy.wait(sleep);
    cy.visit('/clientes');
    cy.wait(sleep);
});

//Recovering password
Cypress.Commands.add('senhasDiferentesMsg', (clt_id, sleep=time) => {

    // Indo para a página de recuperação de senha
    cy.visit(`/clientes/password/${clt_id}`);

    // Preenche os campos do formulário
    cy.get('.senha-atual').type('NOVAsenha123@');  
    cy.get('.senha-nova').type('novaSenha123@');    
    cy.get('.senha-rep').type('senhaDiferente123@'); 

    // Submete o formulário
    cy.get('button').click();

    // Verifica se o alerta de erro aparece
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('A senha não bate com a sua repetição');
    });

    // Confirmando se a página foi recarregada
    cy.wait(sleep);
    cy.visit('/clientes');
    cy.wait(sleep);
});
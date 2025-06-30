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
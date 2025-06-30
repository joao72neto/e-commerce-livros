const time = 1500;

//Abrindo um livro por id
Cypress.Commands.add('cadastrarCliente', (sleep=time) => {

    // Indo para a página de cadastro de cliente
    cy.visit('/clientes/signup');
  
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

    cy.wait(sleep);
});
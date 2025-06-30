const time = 1500;

//Registering address
Cypress.Commands.add('cadastrarEndereco', (clt_id, sleep=time) => {

    // Indo até a página de cadastro de endereço
    cy.visit(`/clientes/address/${clt_id}/add`);

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
    cy.get('#residencia').select('Sim');
    cy.get('#cobranca').select('Não');
    cy.get('#entrega').select('Sim');

    // Cadastrando
    cy.get('button').click();

    //Verificando se a msg de cadastro está sendo exibida corretamente
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Endereço foi cadastrado com sucesso!');
    });

    cy.wait(sleep);
});

//Update address
Cypress.Commands.add('atualizarEndereco', (clt_id, end_id, sleep=time) => {

    // Indo até a página de atualização de endereço
    cy.visit(`/clientes/address/${clt_id}/alt/${end_id}`);

    // Preenchendo os dados
    cy.get('#tipo_residencia').clear().type('Casa');
    cy.get('#tipo_logradouro').clear().type('Rua');
    cy.get('#logradouro').clear().type('Avenida Paulista');
    cy.get('#numero').clear().type('1234');
    cy.get('#bairro').clear().type('Centro');
    cy.get('#cep').clear().type('01000000');
    cy.get('#cidade').clear().type('São Paulo');
    cy.get('#estado').clear().type('SP');
    cy.get('#pais').clear().type('Brasil');
    cy.get('#residencia').select('Não');
    cy.get('#cobranca').select('Não');
    cy.get('#entrega').select('Sim');
    
    // Atualizando
    cy.get('button').click();

    //Verificando se a msg de cadastro está sendo exibida corretamente
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Endereço foi atualizado com sucesso!');
    });

    cy.wait(sleep);
});

//Show address popup
Cypress.Commands.add('showPopupAddress', (clt_id, end_id, sleep=time) => {

    //Indo para a página de endereços
    cy.visit(`/clientes/address/${clt_id}`);

    //Clicando no endereço por id
    cy.wait(sleep);
    cy.get('.endereco-wrapper .address-id').each($id => {
        if($id.text().trim() === String(end_id)){
            cy.wrap($id).closest('.endereco-wrapper').then($wrapper => {
                cy.wrap($wrapper).find('.endereco').click();
            });
        }
    });

    //Verificando se o popup está sendo exibido
    cy.get('.popup').should('exist');
    cy.wait(sleep);
});

//Delete address by id
Cypress.Commands.add('deleteAddress', (clt_id, end_id, sleep=time) => {

    Cypress.on('uncaught:exception', () => false);

    //Indo para a página de endereços
    cy.visit(`/clientes/address/${clt_id}`);

    //Clicando no endereço por id
    cy.wait(sleep);
    cy.get('.endereco-wrapper .address-id').each($id => {
        if($id.text().trim() === String(end_id)){
            cy.wrap($id).closest('.endereco-wrapper').then($wrapper => {
                cy.wrap($wrapper).find('.delete').click();
            });
        }
    });

    // Confirmando a exclusão
    cy.on('window:confirm', () => true);

    cy.wait(sleep);
});
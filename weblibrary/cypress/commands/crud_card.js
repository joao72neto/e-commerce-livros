const time = 1500;

//Registering card
Cypress.Commands.add('cadastrarCartao', (clt_id, sleep=time) => {

    // Acessando a tela de adição de cartão
    cy.visit(`/clientes/card/${clt_id}/add`);

    // Preenchendo os campos do formulário 
    cy.get('#numero_cartao').clear().type('1234123412341234');
    cy.get('#nome_cartao').clear().type('João Silva');
    cy.get('#bandeira_cartao').clear().type('Visa');
    cy.get('#codigo_seguranca').clear().type('123');

    // Clicando no botão de adicionar
    cy.get('button').click();

    //Verificando se a msg de cadastro está sendo exibida corretamente
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Cartão foi cadastrado com sucesso!');
    });

    //Returning to index page
    cy.wait(sleep);
    cy.visit('/clientes');
    cy.wait(sleep);
});

//Updating card
Cypress.Commands.add('atualizarCartao', (clt_id, car_id, sleep=time) => {

    // Acessando a tela de adição de cartão
    cy.visit(`/clientes/card/${clt_id}/alt/${car_id}`);

    // Preenchendo os campos do formulário 
    cy.get('#numero_cartao').clear().type('9876987698769876');
    cy.get('#nome_cartao').clear().type('João Pereira');
    cy.get('#bandeira_cartao').clear().type('Mastercard');
    cy.get('#codigo_seguranca').clear().type('456');

    // Clicando no botão de adicionar
    cy.get('button').click();

    //Verificando se a msg de cadastro está sendo exibida corretamente
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cartão foi atualizado com sucesso!');
    });

    //Returning to index page
    cy.wait(sleep);
    cy.visit('/clientes');
    cy.wait(sleep);
});

//Updating card
Cypress.Commands.add('excluirCartao', (clt_id, car_id, sleep=time) => {
    
    Cypress.on('uncaught:exception', () => false);

    // Acessando a tela de adição de cartão
    cy.visit(`/clientes/card/${clt_id}`);

    //Clicando no botão de excluir 
    cy.wait(sleep);
    cy.get('.card-wrapper .card-id').each($id => {
        if($id.text().trim() === String(car_id)){
            cy.wrap($id).closest('.card-wrapper').then($wrapper => {
                cy.wrap($wrapper).find('.delete').click();
            });
        }
    });

    // Confirmando a exclusão
    cy.on('window:confirm', () => true);

    //Returning to index page
    cy.wait(sleep);
    cy.visit('/clientes');
    cy.wait(sleep);
});
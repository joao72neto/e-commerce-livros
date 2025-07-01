const time = 1500;

//Opening ai chatbot
Cypress.Commands.add('openChatbot', (sleep=time) => {
    
    cy.visit('/');
    cy.wait(sleep);
    cy.get('.chat-button').click();
    cy.wait(sleep);
    cy.get('.chat').should('be.visible');
    cy.get('.chat-button').click();

});

//Send msg
Cypress.Commands.add('sendMsgChatbot', (msg, sleep=time) => {
    
    Cypress.on('uncaught:exception', () => false);

    cy.visit('/');

    cy.wait(sleep);
    cy.get('.chat-button').click();
    cy.wait(sleep);

    cy.get('.input').type(msg);
    cy.wait(sleep);
    cy.get('#ai-button').click();
    cy.get('.chat-msg').should('be.visible');
    cy.wait(sleep);
    cy.get('.chat-button').click();

});


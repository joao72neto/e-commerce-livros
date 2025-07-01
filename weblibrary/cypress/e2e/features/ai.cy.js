const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Testando apenas a UI do chatbot', () => {

    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
        
    });

    it('Deve logar usuário no sistema', () => {
        cy.logarUsuario(1, fastSleep);
        if (pause) cy.pause();

    });

    it('Deve abrir o chatbot corretamente', () => {
        cy.openChatbot(fastSleep);
        if (pause) cy.pause();
    });

    it('Deve enviar uma msg pelo chatbot', () => {
        cy.sendMsgChatbot('Hello AI!', fastSleep);
        if (pause) cy.pause();
    });
});
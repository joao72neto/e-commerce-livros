const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Testando a estrutura dos logs do sistema', () => {

    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
        
    });

    it('Deve logar um usuário no sistema', () => {
        cy.logarUsuario(2, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve verificar a estrutura da tabela de logs do sistema', () => {
        cy.checkLogTable(fastSleep);
        if (pause) cy.pause();
    });
});

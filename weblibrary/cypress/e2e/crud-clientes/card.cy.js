const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Teste Relacionados a Operações com Cartões', () => {
    
    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
    });

    it('Deve preencher e submeter o formulário de adição de cartão', () => {
        cy.logarUsuario(1);
        cy.cadastrarCartao(5, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve preencher e submeter o formulário de alteração de cartão', () => {
        cy.atualizarCartao(5, 11, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve excluir um cartão corretamente',() => {
        cy.excluirCartao(5, 11, fastSleep);
        cy.excluirCartao(5, 10, fastSleep);
        if (pause) cy.pause();
    });
});
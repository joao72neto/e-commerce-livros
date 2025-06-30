const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Testes Relacionados a Operações com Endereços', () => {
    
    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
    });

    it('Deve preencher e submeter o formulário de adição de cartão', () => {
        cy.logarUsuario(1);
        cy.cadastrarEndereco(5, fastSleep); 
        if (pause) cy.pause();
    });

    it('Deve preencher e alterar um endereço existente', () => {
        cy.atualizarEndereco(5, 11, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve mostrar o popup do endereço', () => {
        cy.showPopupAddress(5, 9, fastSleep);
        cy.showPopupAddress(5, 10, fastSleep);
        cy.showPopupAddress(5, 11, fastSleep);
        cy.visit('/clientes');
        if (pause) cy.pause();
    });

    it('Deve excluir um endereço corretamente', () => {
        cy.deleteAddress(5, 11, fastSleep);
        cy.deleteAddress(5, 10, fastSleep); 
        cy.visit('/clientes');
        if (pause) cy.pause();
    });
});
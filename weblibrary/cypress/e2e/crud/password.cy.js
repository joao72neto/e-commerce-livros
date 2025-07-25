const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Testes Relacionados a Alteração de Senha', () => {
    
    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
    });

    it('Deve cadastrar um cliente corretamente', () => {
        cy.logarUsuario(1);
        cy.cadastrarCliente();
        if (pause) cy.pause();
    });

    it('Deve permitir a recuperação de senha', () => {
        cy.recuperarSenha(6, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve exibir alerta de erro se a senha atual estiver incorreta', () => {
        cy.senhaAtualIncorretaMsg(6, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve exibir alerta de erro se as senhas não coincidirem', () => {
        cy.senhasDiferentesMsg(6, fastSleep);
        if (pause) cy.pause();
    });
});
const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Testando a correspondencia dos dados no gráfico', () => {

    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
        
    });

    it('Deve logar um usuário no sistema', () => {
        cy.logarUsuario(1);
        if (pause) cy.pause();
    });

    it('Deve atualizar o gráfico quando o filtro de categoria é aplicado', () => {
        cy.filtrarVendasCategoria(fastSleep);
        if (pause) cy.pause();
    });

    it('Deve atualizar o gráfico ao aplicar o filtro por período', () => {
        cy.filtrarVendasPeriodo('2025-06-02', '2025-06-05', fastSleep);
        if (pause) cy.pause();
    });

    it('Deve aplicar ambos os filtros', () => {
        cy.filtrarVendasPeriCat('2025-06-02', '2025-06-10', fastSleep)
        if (pause) cy.pause();
    });
});

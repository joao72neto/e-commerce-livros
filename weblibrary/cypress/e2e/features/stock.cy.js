const pause = false;
const standardSleep = 200;
const fastSleep = 200;

describe('Realizando operações com o estoque', () => {

    before(() => {
        cy.wait(1000);
        cy.task('resetarBanco'); 
        cy.wait(1000);
        
    });

    it('Deve logar um usuário no sistema', () => {
        cy.logarUsuario(5, fastSleep);
        if (pause) cy.pause();
    });

    it('Deve adicionar "O Nome do Vento" ao estoque', () => {
        
        //Preparing data
        const nome_do_vento = {
            nome: 'O Nome do Vento',
            qtd: 20,
            valor_custo: 30.5
        }
        
        //Adding books to stock
        cy.novaEntradaEstoque(nome_do_vento);
    });

    it('Deve adicionar "A Metamorfose" ao estoque', () => {

        //Preparing data
        const livro1984 = {
            nome: 'A Metamorfose',
            qtd: 50,
            valor_custo: 50.3
        }

        //Adding book
        cy.novaEntradaEstoque(livro1984);
        if (pause) cy.pause();
    });
});
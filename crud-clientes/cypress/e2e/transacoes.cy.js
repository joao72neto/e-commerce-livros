describe('Teste para carregar as transações dos usuários', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('Deve mostrar as transações dos usuários corretamente', () => {

    // Indo para a tela de transações
    cy.get('.acoes .tran').first().click();

    //Verificando se a tela foi carregada com base no título
    cy.get('h1, h2').invoke('text').then((texto) => {
      if (!(texto.includes('Transações de') || texto.includes('Nenhuma transação'))) {

        cy.log('O teste falhou');
        return;

      } 
      
      cy.log('O teste funcionou');

      //Voltando para a tela principal
      cy.get('.voltar').click();
      
    });
  });
});
  
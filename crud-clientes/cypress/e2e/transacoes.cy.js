describe('Teste para carregar as transações dos usuários', () => {
    beforeEach(() => {
      cy.visit('/'); // Ajuste a URL conforme necessário
    });
  
    it('Deve mostrar as transações dos usuários corretamente', () => {
  
      // Clica na opção de transações
      cy.get('.acoes .tran').first().click();
  
      // Verifica o conteúdo do <h2>
      cy.get('h2').then(($h2) => {
        const text = $h2.text(); // Extrai o texto do <h2>
        
        if (text.includes('Nenhuma transação') || text.includes('Transações de')) {
          // Caso o texto seja "Nenhuma transação" ou "Transações de"
          cy.log('O teste falhou');
          cy.get('.voltar').click(); // Volta para a página anterior
          return;
        }
  
        // Caso contrário, indica que o teste falhou
        cy.log('O teste funcionou');
      });
    });
  });
  
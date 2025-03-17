describe('Teste de Cadastro de Dados dos Clientes', () => {

  beforeEach(() => {
    cy.visit('/'); 
  });

  it('Preenche e envia o formulário de cadastro', () => {
  
      cy.get('a[href="/signup"]').click();

      cy.get('#nome').type('João da Silva');
      cy.get('#email').type('joao@email.com');
      cy.get('#telefone').type('5511999999999');
      cy.get('#cpf').type('12345678900');
      cy.get('#gen01').check(); 
      cy.get('#data').type('1990-05-15');
      cy.get('#senha').type('novaSenha123');
      cy.get('#confirma_senha').type('novaSenha123');

      cy.get('#tipo_residencia').type('Apartamento');
      cy.get('#tipo_logradouro').type('Rua');
      cy.get('#logradouro').type('Av. Paulista');
      cy.get('#numero').type('123');
      cy.get('#bairro').type('Centro');
      cy.get('#cep').type('01000000');
      cy.get('#cidade').type('São Paulo');
      cy.get('#estado').type('SP');
      cy.get('#pais').type('Brasil');
      cy.get('#observacoes').type('Cliente VIP');

      cy.get('[name="numero_cartao"]').type('4111111111111111');
      cy.get('[name="nome_cartao"]').type('João da Silva');
      cy.get('[name="bandeira_cartao"]').type('Visa');
      cy.get('[name="codigo_seguranca"]').type('123');

      cy.get('button[type="submit"]').click();
      cy.get('.voltar').click();

  });
});

describe('Teste de Recuperação de Senha', () => {
  beforeEach(() => {

    // Visita a página de recuperação de senha
    cy.visit('/'); 

  });

  it('Deve permitir a recuperação de senha', () => {

    //Indo para a página de recuperação de senha
    cy.get('.acoes .alt').first().click();
    cy.get('.alt_submenu a[href^="/password"]').click();

    // Preenche os campos do formulário
    cy.get('.senha-atual').type('novaSenha123');  // Senha atual
    cy.get('.senha-nova').type('novaSenha123');   // Nova senha
    cy.get('.senha-rep').type('novaSenha123');    // Repete a nova senha

    // Submete o formulário
    cy.get('form').submit();

    // Verifica se a senha foi alterada com sucesso
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Senha alterada com sucesso!');
    });

    // Confirma se a página foi recarregada após a alteração da senha
    cy.reload();
  });

  it('Deve exibir alerta de erro se a senha atual estiver incorreta', () => {

    //Indo para a página de recuperação de senha
    cy.get('.acoes .alt').first().click();
    cy.get('.alt_submenu a[href^="/password"]').click();

    // Preenche os campos do formulário com senha incorreta
    cy.get('.senha-atual').type('senhaErrada123');  // Senha atual errada
    cy.get('.senha-nova').type('novaSenha123');     // Nova senha
    cy.get('.senha-rep').type('novaSenha123');      // Repete a nova senha

    // Submete o formulário
    cy.get('form').submit();

    // Verifica se o alerta de erro aparece
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Senha não bate com a atual cadastrada no banco');
    });
  });

  it('Deve exibir alerta de erro se as senhas não coincidirem', () => {

    //Indo para a página de recuperação de senha
    cy.get('.acoes .alt').first().click();
    cy.get('.alt_submenu a[href^="/password"]').click();

    // Preenche os campos do formulário com senha correta, mas senhas novas diferentes
    cy.get('.senha-atual').type('novaSenha123');  // Senha atual
    cy.get('.senha-nova').type('novaSenha123');    // Nova senha
    cy.get('.senha-rep').type('senhaDiferente123'); // Repete senha diferente

    // Submete o formulário
    cy.get('form').submit();

    // Verifica se o alerta de erro aparece
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Repetição da senha diferente da senha nova');
    });
  });

  it('Deve exibir alerta de erro se campos estiverem vazios', () => {

    //Indo para a página de recuperação de senha
    cy.get('.acoes .alt').first().click();
    cy.get('.alt_submenu a[href^="/password"]').click();

    // Deixa os campos vazios
    cy.get('.senha-atual').type('novaSenha123'); 
    cy.get('.senha-nova').clear();
    cy.get('.senha-rep').clear();

    // Submete o formulário
    cy.get('form').submit();

    // Verifica se o alerta de erro aparece
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Campos estão vazios');
    });
  });
});

describe('Teste de Alteração de Dados do Cliente', () => {
  beforeEach(() => {
      cy.visit('/'); // Altere para a URL correta
  });

  it('Deve preencher e submeter o formulário de alteração', () => {

      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/signup"]').click();

      cy.get('#nome').clear().type('Novo Nome');
      cy.get('#email').clear().type('novoemail@example.com');
      cy.get('#telefone').clear().type('5511999999999');
      cy.get('#cpf').clear().type('09846758465');
      cy.get('#gen01').check();
      cy.get('#data').clear().type('1990-01-01');
      cy.get('#senha').clear().type('novaSenha123');
      cy.get('#confirma_senha').clear().type('novaSenha123');
      
      cy.get('#tipo_residencia').clear().type('Apartamento');
      cy.get('#tipo_logradouro').clear().type('Rua');
      cy.get('#logradouro').clear().type('Nova Rua');
      cy.get('#numero').clear().type('123');
      cy.get('#bairro').clear().type('Centro');
      cy.get('#cep').clear().type('12345678');
      cy.get('#cidade').clear().type('São Paulo');
      cy.get('#estado').clear().type('SP');
      cy.get('#pais').clear().type('Brasil');
      cy.get('#observacoes').clear().type('Cliente VIP');
      
      cy.get('input[name="numero_cartao"]').clear().type('4111111111111111');
      cy.get('input[name="nome_cartao"]').clear().type('Novo Nome');
      cy.get('input[name="bandeira_cartao"]').clear().type('Visa');
      cy.get('input[name="codigo_seguranca"]').clear().type('123');
      
      cy.get('button[type="submit"]').click();
      cy.get('.voltar').click();
      
  });
});

describe('Teste de Cadastro de Endereço', () => {
  beforeEach(() => {
    cy.visit('/'); // Ajuste a URL conforme necessário
  });

  it('Deve preencher e submeter o formulário de adição de endereço', () => {

    cy.get('.acoes .alt').first().click();
    cy.get('.alt_submenu a[href^="/address"]').click();
    cy.get('.endereco-add .add').first().click();

    cy.get('#tipo_residencia').type('Apartamento');
    cy.get('#tipo_logradouro').type('Rua');
    cy.get('#logradouro').type('Avenida Paulista');
    cy.get('#numero').type('1000');
    cy.get('#bairro').type('Bela Vista');
    cy.get('#cep').type('01311000');
    cy.get('#cidade').type('São Paulo');
    cy.get('#estado').type('SP');
    cy.get('#pais').type('Brasil');
    cy.get('#observacoes').type('Endereço principal para cobrança');

    cy.get('button').click();
    cy.get('.voltar').click();
    cy.get('.voltar').click();
 

  });
});

describe('Teste de alteração de endereço', () => {
  beforeEach(() => {
      cy.visit('/'); // Ajuste conforme a URL da sua aplicação
  });

  it('Deve preencher e alterar um endereço existente', () => {

      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/address"]').click();
      cy.get('.acoes-address .alt').first().click();

      // Preenchendo os campos do formulário com novos valores
      cy.get('#tipo_residencia').clear().type('Casa');
      cy.get('#tipo_logradouro').clear().type('Rua');
      cy.get('#logradouro').clear().type('Avenida Paulista');
      cy.get('#numero').clear().type('1234');
      cy.get('#bairro').clear().type('Centro');
      cy.get('#cep').clear().type('01000000');
      cy.get('#cidade').clear().type('São Paulo');
      cy.get('#estado').clear().type('SP');
      cy.get('#pais').clear().type('Brasil');
      cy.get('#observacoes').clear().type('Perto do metrô.');

      // Clicando no botão Alterar
      cy.contains('button', 'Alterar').click();

      cy.get('.voltar').click();
      cy.get('.voltar').click();

  });
});

describe('Teste de Cadastro de Cartão', () => {
  beforeEach(() => {
    cy.visit('/'); // Ajuste a URL conforme necessário
  });

  it('Deve preencher e submeter o formulário de adição de cartão', () => {
    // Acessando a tela de adição de cartão
    cy.get('.acoes .alt').first().click();
    cy.get('.alt_submenu a[href^="/card"]').click();
    cy.get('.card-add').click()

    // Preenchendo os campos do formulário
    cy.get('input[name="numero_cartao"]').type('1234123412341234');
    cy.get('input[name="nome_cartao"]').type('JOAO SILVA');
    cy.get('input[name="bandeira_cartao"]').type('Visa');
    cy.get('input[name="codigo_seguranca"]').type('123');

    // Clicando no botão de adicionar
    cy.get('button').click();

    // Retornando para a tela anterior
    cy.get('.voltar').click();
    cy.get('.voltar').click();
  });
});

describe('Teste de Alteração de Cartão', () => {
  beforeEach(() => {
    cy.visit('/'); // Ajuste a URL conforme necessário
  });

  it('Deve preencher e submeter o formulário de alteração de cartão', () => {
    // Acessando a tela de alteração de cartão
    cy.get('.acoes .alt').first().click();
    cy.get('.alt_submenu a[href^="/card"]').click();
    cy.get('.acoes-card .alt').first().click(); // Botão para editar o cartão

    // Limpando e preenchendo novos dados no formulário
    cy.get('input[name="numero_cartao"]').clear().type('9876987698769876');
    cy.get('input[name="nome_cartao"]').clear().type('JOAO PEREIRA');
    cy.get('input[name="bandeira_cartao"]').clear().type('Mastercard');
    cy.get('input[name="codigo_seguranca"]').clear().type('456');

    // Clicando no botão de salvar alterações
    cy.get('button').click();

    // Retornando para a tela anterior
    cy.get('.voltar').click();
    cy.get('.voltar').click();
  });
});


describe('Teste de Inativação e Reativação de Usuário', () => {
  beforeEach(() => {
    cy.visit('/'); // Ajuste a URL conforme necessário
  });

  it('Deve inativar e reativar um usuário corretamente', () => {

    cy.get('.acoes .inat').first().click();
    cy.get('#btn-inativados').should('exist').click();
    cy.get('.btn-inat').click();
    cy.get('.voltar').click();

  });
});

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

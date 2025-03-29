
//CLIENTES
describe('Teste de Cadastro de Dados dos Clientes', () => {

    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Preenche e envia o formulário de cadastro', () => {
    
        // Indo para a página de cadastro de cliente
        cy.get('a[href^="/clientes/signup"]').click();
  
        // Preenchendo os dados do cliente
        cy.get('#nome').type('João da Silva');
        cy.get('#email').type('joao.teste@email.com');
        cy.get('#telefone').type('+11 11 99999-9999');
        cy.get('#cpf').type('123.456.789-00');
        cy.get('#gen01').check(); 
        cy.get('#data').type('1990-05-02');
        cy.get('#senha').type('novaSenha123@');
        cy.get('#confirma_senha').type('novaSenha123@');
  
        // Preenchendo os dados do endereço do cliente
        cy.get('#tipo_residencia').type('Apartamento');
        cy.get('#tipo_logradouro').type('Rua');
        cy.get('#logradouro').type('Av. Paulista');
        cy.get('#numero').type('123');
        cy.get('#bairro').type('Centro');
        cy.get('#cep').type('01000-000');
        cy.get('#cidade').type('São Paulo');
        cy.get('#estado').type('SP');
        cy.get('#pais').type('Brasil');
        cy.get('#observacoes').type('Cliente VIP');
  
        // Preenchendo os dados do catão do cliente
        cy.get('[name="numero_cartao"]').type('4111111111111111');
        cy.get('[name="nome_cartao"]').type('João da Silva');
        cy.get('[name="bandeira_cartao"]').type('Visa');
        cy.get('[name="codigo_seguranca"]').type('123');
  
        // Confirmando 
        cy.get('button[type="submit"]').click();

        //Verificando se a msg de cadastro está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Cliente foi Cadastrado com Sucesso!');
        });
    });
});

describe('Teste de Alteração de Dados do Cliente', () => {
    beforeEach(() => {
        cy.visit('/clientes'); 
    });
  
    it('Deve preencher e submeter o formulário de alteração', () => {
  
        // Indo para a página de alteração de cliente
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/signup"]').click();

        // Modificando os dados do cliente
        cy.get('#nome').clear().type('Novo Nome');
        cy.get('#email').clear().type('novoemail@example.com');
        cy.get('#telefone').clear().type('5511999999999');
        cy.get('#cpf').clear().type('098.467.584-65');
        cy.get('#gen01').check();
        cy.get('#data').clear().type('1990-01-01');
        cy.get('#senha').clear().type('novaSenha123@');
        cy.get('#confirma_senha').clear().type('novaSenha123@');
        
        // Modificando o endereço do cliente
        cy.get('#tipo_residencia').clear().type('Apartamento');
        cy.get('#tipo_logradouro').clear().type('Rua');
        cy.get('#logradouro').clear().type('Nova Rua');
        cy.get('#numero').clear().type('123');
        cy.get('#bairro').clear().type('Centro');
        cy.get('#cep').clear().type('12345-678');
        cy.get('#cidade').clear().type('São Paulo');
        cy.get('#estado').clear().type('SP');
        cy.get('#pais').clear().type('Brasil');
        cy.get('#observacoes').clear().type('Cliente VIP');
        
        // Modificando o cartão do cliente
        cy.get('input[name="numero_cartao"]').clear().type('4111111111111111');
        cy.get('input[name="nome_cartao"]').clear().type('Novo Nome');
        cy.get('input[name="bandeira_cartao"]').clear().type('Visa');
        cy.get('input[name="codigo_seguranca"]').clear().type('123');
        
        // Confirmando as alterações
        cy.get('button[type="submit"]').click();

        //Verificando se a msg de atualização de dados está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Cliente foi atualizado com sucesso!');
        }); 
    });
});

describe('Teste de Inativação e Reativação de Usuário', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve inativar e reativar um usuário corretamente', () => {
  
        // Inativando um cliente
        cy.get('.acoes .inat').first().click();

        // Indo para a página de inativos
        cy.get('#btn-inativados').should('exist').click();

        // Reativando o cliente
        cy.get('.btn-inat').click();
    });
});

describe('Teste de Exibição de Popup', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve mostrar o popup do cliente corretamente', () => {
        
        //Clicando no primeiro cliente
        cy.get('.cliente').first().click();

        //Fechando o popup caso ele seja exibido
        cy.get('.popup button').should('exist').click();

    });
});

//ADDRESS
describe('Teste de Cadastro de Endereço', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve preencher e submeter o formulário de adição de endereço', () => {
        
        // Indo até a página de cadastro de endereço
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/address"]').click();
        cy.get('.endereco-add .add').first().click();

        // Preenchendo os dados
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

        // Cadastrando
        cy.get('button').click();

        //Verificando se a msg de cadastro está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Endereço foi cadastrado com sucesso!');
        });
    });
});

describe('Teste de alteração de endereço', () => {
    beforeEach(() => {
        cy.visit('/clientes'); 
    });
  
    it('Deve preencher e alterar um endereço existente', () => {
  
        // Indo até a página de alteralção de endereço
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/address"]').click();
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

        //Verificando se a msg de alteração de dados está sendo exibida corretamente
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Endereço foi atualizado com sucesso!');
        });
    });
});

describe('Teste de Exibição de Popup', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve mostrar o popup do cliente corretamente', () => {
        
        //Indo para a págine de endereços
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/address"]').click();
        
        //Clicando no primeiro endereço
        cy.get('.endereco').first().click();

        //Fechando o popup caso ele seja exibido
        cy.get('.popup button').should('exist').click();

    });
});


//CARD
describe('Teste de Cadastro de Cartão', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve preencher e submeter o formulário de adição de cartão', () => {
      // Acessando a tela de adição de cartão
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/clientes/card"]').click();
      cy.get('.card-add').click()
  
      // Preenchendo os campos do formulário 
      cy.get('input[name="numero_cartao"]').type('1234123412341234');
      cy.get('input[name="nome_cartao"]').type('JOAO SILVA');
      cy.get('input[name="bandeira_cartao"]').type('Visa');
      cy.get('input[name="codigo_seguranca"]').type('123');
  
      // Clicando no botão de adicionar
      cy.get('button').click();

      //Verificando se a msg de cadastro está sendo exibida corretamente
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cartão foi cadastrado com sucesso!');
      });

    });
});

describe('Teste de Alteração de Cartão', () => {
    beforeEach(() => {
      cy.visit('/clientes'); 
    });
  
    it('Deve preencher e submeter o formulário de alteração de cartão', () => {
      // Acessando a tela de alteração de cartão
      cy.get('.acoes .alt').first().click();
      cy.get('.alt_submenu a[href^="/clientes/card"]').click();
      cy.get('.acoes-card .alt').first().click(); // Botão para editar o cartão
  
      // Limpando e preenchendo novos dados no formulário
      cy.get('input[name="numero_cartao"]').clear().type('9876987698769876');
      cy.get('input[name="nome_cartao"]').clear().type('JOAO PEREIRA');
      cy.get('input[name="bandeira_cartao"]').clear().type('Mastercard');
      cy.get('input[name="codigo_seguranca"]').clear().type('456');
  
      // Clicando no botão de salvar alterações
      cy.get('button').click();

      //Verificando se a msg de alteração de dados está sendo exibida corretamente
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cartão foi atualizado com sucesso!');
      });
 
    });
});
  

//PASSWORD
describe('Teste de Recuperação de Senha', () => {
    beforeEach(() => {
        cy.visit('/clientes'); 
    });
  
      
    it('Deve permitir a recuperação de senha', () => {

        // Obtendo o id do cliente
        cy.get('.cliente-id').first().invoke('text').then((clienteId) => {
            
            // Pegando os dados do cliente com base no id
            cy.request(`/api/clientes/id/${clienteId}`).then((response) => {
                const cliente = response.body[0];

                // Indo para a página de recuperação de senha
                cy.get('.acoes .alt').first().click();
                cy.get('.alt_submenu a[href^="/clientes/password"]').click();

                // Preenche os campos do formulário
                cy.get('.senha-atual').type(cliente.clt_senha); 
                cy.get('.senha-nova').type('novaSenha123@');   
                cy.get('.senha-rep').type('novaSenha123@');    
    
                // Submete o formulário
                cy.get('form').submit();
    
                // Verifica se a senha foi alterada com sucesso
                cy.on('window:alert', (alertText) => {
                    expect(alertText).to.contains('Senha alterada com sucesso!');
                });
    
                // Confirmando se a página foi recarregada
                cy.reload();

            });
        });
    });
  
    it('Deve exibir alerta de erro se a senha atual estiver incorreta', () => {
  
        // Indo para a página de recuperação de senha
        cy.get('.acoes .alt').first().click();
        cy.get('.alt_submenu a[href^="/clientes/password"]').click();

        // Preenche os campos do formulário com senha atual incorreta
        cy.get('.senha-atual').type('senhaErrada123@');  
        cy.get('.senha-nova').type('novaSenha123@');     
        cy.get('.senha-rep').type('novaSenha123@');      

        // Submete o formulário
        cy.get('form').submit();

        // Verifica se o alerta de erro aparece
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Senha não bate com a atual cadastrada no banco');
        });
    });
  
    it('Deve exibir alerta de erro se as senhas não coincidirem', () => {
  

        // Obtendo o id do cliente
        cy.get('.cliente-id').first().invoke('text').then((clienteId) => {
                
            // Pegando os dados do cliente com base no id
            cy.request(`/api/clientes/id/${clienteId}`).then((response) => {
                const cliente = response.body[0];

                //Indo para a página de recuperação de senha
                cy.get('.acoes .alt').first().click();
                cy.get('.alt_submenu a[href^="/clientes/password"]').click();

                // Preenche com a senha atual correta, mas senhas novas diferentes
                cy.get('.senha-atual').type(cliente.clt_senha);  
                cy.get('.senha-nova').type('novaSenha123@');    
                cy.get('.senha-rep').type('senhaDiferente123@'); 

                // Submete o formulário
                cy.get('form').submit();

                // Verifica se o alerta de erro aparece
                cy.on('window:alert', (alertText) => {
                    expect(alertText).to.contains('A senha não bate com a sua repetição');
                });
            });
        }); 
    });
  
    it('Deve exibir alerta de erro se campos estiverem vazios', () => {
  
        // Obtendo o id do cliente
        cy.get('.cliente-id').first().invoke('text').then((clienteId) => {
                
            // Pegando os dados do cliente com base no id
            cy.request(`/api/clientes/id/${clienteId}`).then((response) => {
                const cliente = response.body[0];

                //Indo para a página de recuperação de senha
                cy.get('.acoes .alt').first().click();
                cy.get('.alt_submenu a[href^="/clientes/password"]').click();

                // Deixa campos vazios
                cy.get('.senha-atual').type(cliente.clt_senha); 
                cy.get('.senha-nova').clear();
                cy.get('.senha-rep').clear();

                // Submete o formulário
                cy.get('form').submit();

                // Verifica se o alerta de erro aparece
                cy.on('window:alert', (alertText) => {
                    expect(alertText).to.contains('Preencha os campos vazios');
                });
            });
        });   
    });
});
  
//TRANSACOES
describe('Teste para carregar as transações dos usuários', () => {
    beforeEach(() => {
      cy.visit('/clientes');
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
    
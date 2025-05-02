describe('Testes Relacionados a Operações de Filtro', () => {
    beforeEach(() => {
        cy.visit('/clientes'); 
    });

    it('Deve preencher e enviar o formulário de cadastro de múltiplos clientes', () => {
        const clientes = [
            { nome: 'João da Silva', email: 'joao.teste@email.com', telefone: '+55 11 99999-9999', cpf: '123.456.789-00', senha: 'novaSenha123@' },
            { nome: 'Maria Oliveira', email: 'maria.teste@email.com', telefone: '+55 11 98888-8888', cpf: '234.567.890-11', senha: 'senha123@M' },
            { nome: 'Carlos Souza', email: 'carlos.teste@email.com', telefone: '+55 11 97777-7777', cpf: '345.678.901-22', senha: 'senha123@C' },
            { nome: 'Fernanda Costa', email: 'fernanda.teste@email.com', telefone: '+55 11 96666-6666', cpf: '456.789.012-33', senha: 'senha123@F' },
            { nome: 'Ricardo Pereira', email: 'ricardo.teste@email.com', telefone: '+55 11 95555-5555', cpf: '567.890.123-44', senha: 'senha123@R' }
        ];
    
        clientes.forEach(cliente => {
            // Indo para a página de cadastro de cliente
            cy.get('a[href^="/clientes/signup"]').click();
      
            // Preenchendo os dados do cliente
            cy.get('#nome').type(cliente.nome);
            cy.get('#email').type(cliente.email);
            cy.get('#telefone').type(cliente.telefone);
            cy.get('#cpf').type(cliente.cpf);
            cy.get('#gen01').check(); 
            cy.get('#data').type('1990-05-02');
            cy.get('#senha').type(cliente.senha);
            cy.get('#confirma_senha').type(cliente.senha);
      
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
      
            // Preenchendo os dados do cartão do cliente
            cy.get('#numero_cartao').type('4111111111111111');
            cy.get('#nome_cartao').type(cliente.nome);
            cy.get('#bandeira_cartao').type('Visa');
            cy.get('#codigo_seguranca').type('123');
      
            // Confirmando 
            cy.get('button[type="submit"]').click();
    
            // Verificando se a msg de cadastro está sendo exibida corretamente
            cy.on('window:alert', (alertText) => {
                expect(alertText).to.contains('Cliente foi Cadastrado com Sucesso!');
            });
    
            // Aguardando um pouco para garantir que o cliente foi cadastrado
            cy.wait(1000);
        });
    });   
    
    it('Deve testar todos os campos do filtro', () => {

        //Abrindo o filtro
        cy.get('.filtro').click();

        //Nome 
        cy.get('#nome').type('João');
        cy.get('#btn-filtro').click();

        //E-mail
        cy.get('#email').type('joao@email.com');
        cy.get('#btn-filtro').click();

        //CPF
        cy.get('#cpf').type('123.523.634-34');
        cy.get('#btn-filtro').click();

        //Telefone
        cy.get('#telefone').type('55 11 93567-3456');
        cy.get('#btn-filtro').click();

        //Genero
        cy.get('#genero').type('M');
        cy.get('#btn-filtro').click();

        //Data de Nascimento
        cy.get('#dataNasc').type('1990-12-12');
        cy.get('#btn-filtro').click();

        //Mostrando todos os dados
        cy.get('#btn-filtro').click();
        cy.get('.filtro_clientes').should('have.css', 'display', 'none');

    });

    it('Deve excluir 5 clientes corretamente', () => {
  
        // Inativando um cliente
        for(let i=0; i < 5; i++){
            cy.get('.acoes .inat').first().click();
        }

        cy.get('#btn-inativados').should('exist').click();

        // Excluindo o cliente
        for(let i=0; i < 5; i++){
            cy.get('.btn-delete').first().click();
            cy.on('window:confirm', () => true);
        }

        //Confirmando a exclusão
        cy.get('h1').should('have.text', 'Nenhum Cliente Inativo');
        cy.get('.voltar').click();
        cy.get('h1').should('have.text', 'Nenhum Cliente Ativo');
    });
});
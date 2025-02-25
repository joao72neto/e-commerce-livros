//Dados fictícios
const transacoes = [
    { id: 1, data: '2025-02-24T15:30:00', tipo: 'Alteração de Perfil', acao: 'E-mail foi alterado para joao72neto@gmail.com', status: 'Confirmado' },
    { id: 2, data: '2025-02-25T17:30:00', tipo: 'Alteração de Perfil', acao: 'Novo endereço adicionado "Estrada Antiga Imperial"', status: 'Confirmado' },
    { id: 3, data: '2025-02-26T19:30:00', tipo: 'Alteração de Perfil', acao: 'Cartão de crédito "Visa-3020" removido', status: 'Confirmado' },
    { id: 4, data: '2025-02-27T21:30:00', tipo: 'Compra', acao: 'Compra do livro "Senhor dos Anéis" realizada', status: 'Pendente' },
    { id: 5, data: '2025-02-28T23:30:00', tipo: 'Segurança', acao: 'Senha alterada', status: 'Confirmado' }
];


//Carregando os dados
const tabela = document.querySelector("#transactionTable");
let container = document.querySelector('#lista-transacoes');

//Criando um elemento para colocar os Dados
let tbody = document.createElement('tbody');


transacoes.forEach(transacao => {
    const linha = `<tr>
        <td>${transacao.id}</td>
        <td>${transacao.data}</td>
        <td>${transacao.tipo}</td>
        <td>${transacao.acao}</td>
        <td>${transacao.status}</td>
    </tr>`;

    tbody.innerHTML += linha;
});

container.appendChild(tbody);


//Pegando o nome e o e-mail do usuário que fez a transação
let nome = document.querySelector('#nome-cliente');
let email = document.querySelector('#email-cliente');

let dados = JSON.parse(sessionStorage.getItem('clienteTransacoes'));

nome.textContent = dados.nome;
email.textContent = dados.email;


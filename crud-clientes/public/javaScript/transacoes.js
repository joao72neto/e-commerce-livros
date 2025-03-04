import { pegarTodosClientes } from "/javaScript/apiService.js";
import { pegarTodasTransacoes } from "/javaScript/apiService.js";


//Carregando os dados
//const tabela = document.querySelector("#transactionTable");
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

//let dados = JSON.parse(sessionStorage.getItem('clienteTransacoes'));

nome.textContent = dados.nome;
email.textContent = dados.email;


//Dados fictícios
const transacoes = [
    { id: 1, produto: "O Senhor dos Anéis", quantidade: 1, preco: 120.00, pagamento: "Cartão", data: "2025-02-24" },
    { id: 2, produto: "Harry Potter", quantidade: 1, preco: 45.00, pagamento: "PIX", data: "2025-02-23" },
    { id: 3, produto: "Dom Quixote", quantidade: 1, preco: 60.00, pagamento: "Boleto", data: "2025-02-22" }
];

//Carregando os dados
const tabela = document.querySelector("#transactionTable");
let container = document.querySelector('#lista-transacoes');

//Criando um elemento para colocar os Dados
let tbody = document.createElement('tbody');


transacoes.forEach(transacao => {
    const linha = `<tr>
        <td>${transacao.produto}</td>
        <td>${transacao.quantidade}</td>
        <td>R$ ${transacao.preco.toFixed(2)}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.data}</td>
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


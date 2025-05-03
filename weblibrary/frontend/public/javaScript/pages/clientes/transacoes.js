import { buscarClienteIdService } from "/javaScript/service/clientes/serviceClientes.js";

//Exibindo o nome e o e-mail do cliente
const id = window.location.pathname.split('/').splice(-1)[0];

let cliente = await buscarClienteIdService(id);

document.querySelector('#nome-cliente').textContent = cliente.clt_nome;
document.querySelector('#email-cliente').textContent = cliente.clt_email;


//Exbindo msg para quando não há transações
if(document.querySelector('tbody').innerHTML.trim() === ''){
    document.querySelector('.transaction').innerHTML = `
    
        <h2>Nenhuma transação para ${cliente.clt_nome}</h2>
    `;
}



import { pegarClienteId } from "/javaScript/service/serviceClientes.js";

//Exibindo o nome e o e-mail do cliente
const id = window.location.pathname.split('/').splice(-1)[0];
console.log(id);

let cliente = await pegarClienteId(id);

document.querySelector('#nome-cliente').textContent = cliente.clt_nome;
document.querySelector('#email-cliente').textContent = cliente.clt_email;



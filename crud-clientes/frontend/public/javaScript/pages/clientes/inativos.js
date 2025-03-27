import { ativarClienteService } from "/javaScript/service/clientes/serviceClientes.js";
import { buscarClientesInativosService } from "/javaScript/service/clientes/serviceClientes.js";

import { deletarClienteIdService } from "/javaScript/service/clientes/serviceClientes.js";

//Personalizando a msg de cliente inativos
let clientesInativos = await buscarClientesInativosService();

if (clientesInativos.length === 0) {
    let titulo = document.querySelector('.title');
    titulo.textContent = 'Nunhum Cliente Inativo';
    titulo.style.cssText = `

        background-color: white;
        font-size: 1.8em;
        box-shadow: 0px 0px 20px #0000005b;
        padding: 40px;
        border-radius: 20px;
    
    `
}

//Reativando o cliente
document.querySelectorAll('.btn-inat').forEach(button => {
    button.addEventListener('click', async function(){

        const clienteWrapper = this.closest('.wrapper');
        const id = clienteWrapper.querySelector('.cliente-inat-id').textContent;

        let status = await ativarClienteService(id);

        if (status === 204){
            location.reload();
        }
    });
});


//Exluindo cliente
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async function(){

        let resposta = confirm('Deseja realmente excluir o usuário?');

        if(!resposta){
            return;
        }

        const clienteWrapper = this.closest('.wrapper');
        const id = clienteWrapper.querySelector('.cliente-inat-id').textContent;

        let status = await deletarClienteIdService(id);

        if (status === 204){
            location.reload();
        }
    });
});

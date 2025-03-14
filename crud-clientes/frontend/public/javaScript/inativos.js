import { ativarClienteService } from "/javaScript/service/serviceClientes.js";
import { buscarClientesInativosService } from "/javaScript/service/serviceClientes.js";

//Personalizando a msg de cliente inativos
let clientesInativos = await buscarClientesInativosService();

if (clientesInativos.length === 0) {
    let titulo = document.querySelector('.title');
    titulo.textContent = 'Nunhum Cliente Inativo';
    titulo.style.cssText = `
    
        box-shadow: 0px 0px 20px #0000005b;
        padding: 40px;
        border-radius: 20px;
    
    `
}

//Reativando o cliente
document.querySelectorAll('.btn-inat').forEach(button => {
    button.addEventListener('click', async function(){

        const clienteWrapper = this.closest('.cliente-wrapper');
        const id = clienteWrapper.querySelector('.cliente-inat-id').textContent;

        let status = await ativarClienteService(id);

        if (status === 204){
            location.reload();
        }
    });
});
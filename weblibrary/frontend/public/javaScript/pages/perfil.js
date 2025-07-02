import { deletarCardIdService } from "/javaScript/service/clientes/serviceCard.js";
import { deletarAddressIdService } from "/javaScript/service/clientes/serviceAddress.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { updateDefaulCardService } from "/javaScript/service/clientes/serviceCard.js";

//Verificando o tipo de operação
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    
    if(tipo){
    
        if (tipo === 'cartao'){
            document.querySelector('.usuario').remove();
            document.querySelector('.enderecos').remove();
        }  

        if(tipo === 'endereco'){
            document.querySelector('.usuario').remove();
            document.querySelector('.cartoes').remove();
        }
    }

    //Calling functions
    deleteCard();
    deleteAddress();
    updateDefaultCardProfile();
});

function updateDefaultCardProfile(){
    document.querySelector('#preferencia').addEventListener('change', async function(){

        //Get current client
        const client = await buscarClienteLogadoService();
        const clt_id = client[0].clt_id;

        //Prepara data
        const data = {
            clt_id: clt_id,
            car_id: Number(this.value)
        }

        //Update default card status
        const res = await updateDefaulCardService(data);

        //Catching error
        if(!res === 200){
            alert('Não foi possível atualizar o status do cartão');
            return;
        }

        //Reloading page
        window.location.reload();
    });
}

function deleteCard(){
    document.querySelectorAll('.delete-card').forEach(button => {
        button.addEventListener('click', async function(event){
            event.preventDefault();

            let resposta = confirm('Deseja realmente deletar o cartão?');

            if(!resposta){
                return;
            }

            const enderecoWrapper = this.closest('.wrapper');
            const car_id = enderecoWrapper.querySelector('.card-id').textContent;
            const clt_id = enderecoWrapper.querySelector('.cliente-id').textContent;

            const res = await deletarCardIdService(clt_id, car_id, '');

            if(res.status === 204){
                location.reload();
            }

            alert(res.msg.msg);
        });
    });
}

function deleteAddress(){
    document.querySelectorAll('.delete-address').forEach(button => {
        button.addEventListener('click', async function(event){
            event.preventDefault();

            let resposta = confirm('Deseja realmente deletar o endereço?');

            if(!resposta){
                return;
            }

            const enderecoWrapper = this.closest('.wrapper');
            const end_id = enderecoWrapper.querySelector('.address-id').textContent;
            const clt_id = enderecoWrapper.querySelector('.cliente-id').textContent;

            const res = await deletarAddressIdService(clt_id, end_id, '');

            if(res.status === 204){
                location.reload();
            }

            alert(res.msg.msg);
        });
    });
}



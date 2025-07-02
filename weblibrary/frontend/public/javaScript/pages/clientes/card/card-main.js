import { deletarCardIdService } from "/javaScript/service/clientes/serviceCard.js";
import { updateDefaulCardService } from "/javaScript/service/clientes/serviceCard.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";

document.addEventListener('DOMContentLoaded', function(){
    updateDefaultCard();
    redirectAltCardPage();
    deleteCard();
});

function updateDefaultCard(){
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


function redirectAltCardPage(){
    document.querySelectorAll('.alt').forEach(button => {

        button.addEventListener('click', function(){
            const enderecoWrapper = this.closest('.card-wrapper');
            const id = enderecoWrapper.querySelector('.card-id').textContent;

            const path = window.location.pathname + `/alt/${id}`;

            console.log(path);

            window.location.href = path;
        });
    });
}

function deleteCard(){
    document.querySelectorAll('.delete').forEach(button => {

        button.addEventListener('click', async function(event){

            event.preventDefault();

            let resposta = confirm('Deseja realmente deletar o cartão?');

            if(!resposta){
                return;
            }

            const enderecoWrapper = this.closest('.card-wrapper');
            const car_id = enderecoWrapper.querySelector('.card-id').textContent;
            const clt_id = window.location.pathname.split('/').splice(-1)[0];

            const res = await deletarCardIdService(clt_id, car_id, '(Admin) ');

            if(res.status === 204){
                location.reload();
            }

            alert(res.msg.msg);

        });
    });
}

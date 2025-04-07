import { deletarCardIdService } from "/javaScript/service/clientes/serviceCard.js";

import { deletarAddressIdService } from "/javaScript/service/clientes/serviceAddress.js"

//deletando um cartão
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

        const res = await deletarCardIdService(clt_id, car_id);

        if(res.status === 204){
            location.reload();
        }

        alert(res.msg.msg);

    });
});


//deletando um endereço
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


        const res = await deletarAddressIdService(clt_id, end_id);

        if(res.status === 204){
            location.reload();
        }

        alert(res.msg.msg);

    });
});

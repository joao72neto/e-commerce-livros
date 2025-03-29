import { deletarCardIdService } from "/javaScript/service/clientes/serviceCard.js"

//Pegando o ID do cartao ao clicar
document.querySelectorAll('.alt').forEach(button => {
    
    button.addEventListener('click', function(){
        const enderecoWrapper = this.closest('.card-wrapper');
        const id = enderecoWrapper.querySelector('.card-id').textContent;

        const path = window.location.pathname + `/alt/${id}`;

        console.log(path);

        window.location.href = path;
    });
});


//deletando um endereço
document.querySelectorAll('.delete').forEach(button => {
    
    button.addEventListener('click', async function(){


        let resposta = confirm('Deseja realmente deletar o cartão?');

        if(!resposta){
            return;
        }

        const enderecoWrapper = this.closest('.card-wrapper');
        const car_id = enderecoWrapper.querySelector('.card-id').textContent;
        const clt_id = window.location.pathname.split('/').splice(-1)[0];


        const res = await deletarCardIdService(clt_id, car_id);

        console.log(res);

        if(res.status === 204){
            location.reload();
        }

        alert(res.erros.erros[0].msg);

    });
});
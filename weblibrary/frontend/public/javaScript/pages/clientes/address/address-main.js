import { deletarAddressIdService } from "/javaScript/service/clientes/serviceAddress.js"

//Pegando o ID do endereco ao clicar em alterar
document.querySelectorAll('.alt').forEach(button => {
    
    button.addEventListener('click', function(){
        const enderecoWrapper = this.closest('.endereco-wrapper');
        const id = enderecoWrapper.querySelector('.address-id').textContent;

        const path = window.location.pathname + `/alt/${id}`;

        window.location.href = path;

    });
});


//deletando um endereço
document.querySelectorAll('.delete').forEach(button => {
    
    button.addEventListener('click', async function(event){

        event.preventDefault();

        let resposta = confirm('Deseja realmente deletar o endereço?');

        if(!resposta){
            return;
        }

        const enderecoWrapper = this.closest('.endereco-wrapper');
        const end_id = enderecoWrapper.querySelector('.address-id').textContent;
        const clt_id = window.location.pathname.split('/').splice(-1)[0];

        const res = await deletarAddressIdService(clt_id, end_id, '(Admin) ');

        if(res.status === 204){
            location.reload();
        }

        alert(res.msg.msg);

    });
});

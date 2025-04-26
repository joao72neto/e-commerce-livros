import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";

document.addEventListener('DOMContentLoaded', function(){


    //Ocultando selects
    const entrega = document.querySelectorAll('#entrega').forEach(select => {
        select.style.display = 'none';
    });
    const troca = document.querySelectorAll('#troca').forEach(select => {
        select.style.display = 'none';
    });
    const devolucao = document.querySelectorAll('#devolucao').forEach(select => {
        select.style.display = 'none';
    }); 

    //Exibindo os selects corretamento
    document.querySelectorAll('.status-atual').forEach(function(status){

        //Lógica para exibição dos selects
        if(status.textContent === 'Aprovado'){
            const statusContainer = status.closest('.status');
            const entrega = statusContainer.querySelector('#entrega');
            entrega.style.display = 'block';
            return;
        }
    });

    //Lógica para alteração do status do processamento
    document.querySelectorAll('#processamento').forEach(select => {
        
        select.addEventListener('change', async function(){
            

            //Obtendo os dados para atualizar o select de processamento

            const wrapper = this.closest('.wrapper');
            const vnd_id = Number(wrapper.querySelector('.vnd-id').textContent);

            const dados = {
                vnd_id: vnd_id,
                vnd_status: this.value
            };

            //Atualizando o status do processamento no banco
            const res = await atualizarStatusPedidoIdService(dados);

            if(!res === 200){
                alert('Não foi possível atualizar o status');
                return;
            }

            window.location.reload();
        });
    });
});
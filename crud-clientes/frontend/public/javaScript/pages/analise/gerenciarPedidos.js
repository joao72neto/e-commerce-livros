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

    //Lógica para mostrar os selects 
    const processamento = document.querySelectorAll('#processamento').forEach(select => {
        
        select.addEventListener('change', async function(){
            

            //Obtendo os dados para atualizar o select de processamento
            const dados = {
                vnd_id: Number(document.querySelector('.vnd-id').textContent),
                vnd_status: this.value
            };

            //Atualizando o status do processamento no banco
            const res = await atualizarStatusPedidoIdService(dados);

            if(!res === 200){
                alert('Não foi possível atualizar o status');
                return;
            }

            //Obtendo dados da entrega
            const status = this.closest('.status');
            const entrega = status.querySelector('#entrega');
            
            //Lógica para exibição dos selects
            if(select.value === 'Aprovado'){
                entrega.style.display = 'block';
                return;
            }

            entrega.style.display = 'none';
        });
    });

});
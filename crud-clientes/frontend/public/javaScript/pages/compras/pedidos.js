import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";

document.addEventListener('DOMContentLoaded', function(){

    //Adicionando evento para quando clicar algum link
    this.querySelectorAll('a').forEach(btn => {
        btn.addEventListener('click', async function(){
            
            //Atualizando o status dos pedidos
            const wrapper = this.closest('.wrapper');
            const vnd_id = wrapper.querySelector('.vnd-id').textContent;

            //Preparando os dados
            let dados = {
                vnd_id: vnd_id,
                vnd_status: 'Devolução Solicitada'
            }

            if (this.classList.contains('troca')){
                dados.vnd_status = 'Troca Solicitada';
            }

            //Atualizando o status
            const res = await atualizarStatusPedidoIdService(dados);

            if(res === 200){
                window.location.reload();
                return;
            }

            alert('Não foi possível fazer a troca ou devolução');
        });
    });
});
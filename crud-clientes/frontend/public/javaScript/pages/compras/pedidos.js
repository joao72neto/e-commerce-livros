import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { devolverTrocarProdutoService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";

document.addEventListener('DOMContentLoaded', function(){

    //Adicionando evento para quando clicar algum link
    this.querySelectorAll('a').forEach(btn => {
        btn.addEventListener('click', async function(){
            
            //Atualizando o status dos pedidos
            const wrapper = this.closest('.wrapper');
            const vnd_id = wrapper.querySelector('.vnd-id').textContent;
            const lvr_id = wrapper.querySelector('.book-id').textContent;
            let tipo = 'devolucao';

            //Preparando os dados
            let dados = {
                vnd_id: vnd_id,
                vnd_status: 'Devolução Solicitada'
            }

            if (this.classList.contains('troca')){
                dados.vnd_status = 'Troca Solicitada';
                tipo = 'troca';
            }

            //Atualizando o status
            const res = await atualizarStatusPedidoIdService(dados);

            if(res === 200){

                //Adicionando o livro na tabela de trocas
                const cliente = await buscarClienteLogadoService();
                

                //Preparando os dados
                const troca = {
                    trc_clt_id: cliente[0].clt_id,
                    trc_lvr_id: Number(lvr_id),
                    trc_qtd: Number(wrapper.querySelector('#qtd').textContent),
                    trc_preco: Number(wrapper.querySelector('#preco').textContent),
                    trc_tipo: tipo
                }

                console.log(troca);

                const res = await devolverTrocarProdutoService(troca);
                
                if(res === 201){
                    alert(tipo + ' solicitado(a) com sucesso!');
                    window.location.reload();
                    return;
                }

                alert('Não foi possível solicitar o(a) ' + tipo);
                return;
            }

            alert('Não foi possível atualizar o status do pedido');
        });
    });

    this.querySelectorAll('.acoes').forEach(function(acoes){
        const wrapper = acoes.closest('.wrapper');
        const statusText = wrapper.querySelector('.status strong').textContent;

        if(statusText !== 'Entregue'){
            acoes.remove();
            wrapper.style.cssText = `
                grid-template-columns: 1fr 1fr 40%;
            
            `
        }
    });
});
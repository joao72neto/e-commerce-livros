import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { deletarDevolvidoTrocadoService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";

document.addEventListener('DOMContentLoaded', function(){


    //OCULTANDO SELECTS
    const entrega = document.querySelectorAll('#entrega').forEach(select => {
        select.style.display = 'none';
    });
    const troca = document.querySelectorAll('#troca').forEach(select => {
        select.style.display = 'none';
    });
    const devolucao = document.querySelectorAll('#devolucao').forEach(select => {
        select.style.display = 'none';
    }); 

    
    //CRIANDO O FLUXO DE ALTERAÇÃO DO STATUS

    //Exibindo os selects corretamento
    document.querySelectorAll('.status-atual').forEach(async function(status){

        //Obtendo os selects
        const statusContainer = status.closest('.status');
        const entrega = statusContainer.querySelector('#entrega');
        const processamento = statusContainer.querySelector('#processamento');
        const troca = statusContainer.querySelector('#troca');
        const devolucao = statusContainer.querySelector('#devolucao');

        //Lógica do fluxo de processamento de pedidos
        const statusProcessamento = ['Aprovado', 'Em Transporte', 'Entregue'];

        if(statusProcessamento.includes(status.textContent)){

            processamento.disabled = true;
            entrega.style.display = 'block';

            if (status.textContent === 'Em Transporte' || status.textContent === 'Entregue') {
                const emptyOption = entrega.querySelector('.empty');
                
                if (emptyOption) {
                    emptyOption.remove(); 
                }

                processamento.remove();
            }

            if(status.textContent === 'Aprovado'){
                entrega.querySelector('.rm').remove();
            }

            if(status.textContent === 'Entregue'){
                entrega.disabled = true;
            }
        }

        if(status.textContent === 'Reprovado' || 
           status.textContent === 'Cancelado'){
            processamento.disabled = true;
        }

        //Fluxo de Troca
        if(status.textContent === 'Troca Solicitada' ||
           status.textContent === 'Troca Aceita' ||
           status.textContent === 'Troca Recusada' ||
           status.textContent === 'Troca Concluída'
        ){
            processamento.style.display = 'none'
            troca.style.display = 'block'; 

            if(status.textContent === 'Troca Aceita'){
                troca.querySelectorAll('.rm').forEach(item => {
                    item.remove();
                });

                const trocaEstoque = document.querySelector('.troca');
                trocaEstoque.style.display = 'block';
            }

            if(status.textContent === 'Troca Recusada' || 
               status.textContent === 'Troca Concluída'
            ){
                troca.disabled = true;

                if(status.textContent === 'Troca Concluída'){
                    const trocaEstoque = document.querySelector('.troca');
                    trocaEstoque.style.display = 'none';
                }
            }
        }

        //Fluxo de Devolução
        if(status.textContent === 'Devolução Solicitada' ||
           status.textContent === 'Devolução Aceita' ||
           status.textContent === 'Devolução Recusada' ||
           status.textContent === 'Devolução Concluída'
        ){

            processamento.style.display = 'none'
            devolucao.style.display = 'block'; 

            if(status.textContent === 'Devolução Solicitada'){
                devolucao.querySelector('.con').remove();
                return;
            }

            if(status.textContent === 'Devolução Aceita'){
                devolucao.querySelectorAll('.rm').forEach(item => {
                    item.remove();
                });

                const devEstoque = document.querySelector('.devolucao');
                devEstoque.style.display = 'block';
                return;
            }

            if(status.textContent === 'Devolução Recusada' ||
               status.textContent === 'Devolução Concluída'
            ){

                const wrapper = devolucao.closest('.wrapper');
                const statusAtual = wrapper.querySelector('.status-atual');
                const dados = {
                    clt_id: wrapper.querySelector('.clt-id').textContent,
                    lvr_id: wrapper.querySelector('.lvr-id').textContent
                }

                const res = await deletarDevolvidoTrocadoService(dados);

                if(!res === 204){
                    alert('Não foi possível excluir o produto da tabela de troca');
                    return;
                }

                devolucao.disabled = true;
                statusAtual.remove();
            }
        }
    });

    //ALTERANDO O STATUS NO BANCO

    //Alterando status do select de processamento do pedido
    document.querySelectorAll('#processamento').forEach(select => {
        select.addEventListener('change', async function(){
            await atualizarStatus(this);
        });
    });

    //Alterando o status dos selects de entrega
    document.querySelectorAll('#entrega').forEach(entrega => {
        if(entrega.style.display === 'block'){
            entrega.addEventListener('change', async function(){
                await atualizarStatus(this);
            });
        }
    });

    //Alterando o status do select de troca
    document.querySelectorAll('#troca').forEach(entrega => {
        if(entrega.style.display === 'block'){
            entrega.addEventListener('change', async function(){
                await atualizarStatus(this);
            });
        }
    });

    //Alterando o status do select de troca
    document.querySelectorAll('#devolucao').forEach(entrega => {
        if(entrega.style.display === 'block'){
            entrega.addEventListener('change', async function(){
                await atualizarStatus(this);
            });
        }
    });


    async function atualizarStatus(select){

        //Obtendo os dados para atualizar o select de entrega
        const wrapper = select.closest('.wrapper');
        const vnd_id = Number(wrapper.querySelector('.vnd-id').textContent);

        const dados = {
            vnd_id: vnd_id,
            vnd_status: select.value
        };

        //Atualizando o status no banco de dados
        const res = await atualizarStatusPedidoIdService(dados);

        if(!res === 200){
            alert('Não foi possível atualizar o status');
            return;
        }

        window.location.reload();
    }
});
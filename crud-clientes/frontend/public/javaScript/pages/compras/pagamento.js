import { deletarCupomIdService } from "/javaScript/service/compras/servicePagamento.js";
import { inativarCupomService } from "/javaScript/service/compras/servicePagamento.js";
import { ativarCupomService } from "/javaScript/service/compras/servicePagamento.js";
import { buscarCuponsAtivosClienteIdService } from "/javaScript/service/compras/servicePagamento.js";
import { buscarCuponsInativosClienteIdService } from "/javaScript/service/compras/servicePagamento.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { buscarCarrinhoClienteIdService } from "/javaScript/service/compras/serviceCarrinho.js";
import { adicionarPedidoService } from "/javaScript/service/compras/servicePedidos.js";

//Verficado se há cupons disponíveis ou não
document.addEventListener('DOMContentLoaded', async function(){

    //Verificando se há cupons inativos
    const cliente = await buscarClienteLogadoService();
    const cuponsInativos = await buscarCuponsInativosClienteIdService(cliente[0].clt_id);
    
    if(cuponsInativos.length > 0){
        return;
    }

    //Obtendo o select
    const select = document.querySelector('#cupons');

    // Exibindo uma msg quando não tivermais cupons para uso
    select.innerHTML = '';

    // Cria uma nova option com valor padrão
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Nenhum';
    option.disabled = true;
    option.selected = true;

    select.appendChild(option);
});


//Adicionando cupons que o cliente possui
document.querySelector('.add-cupom').addEventListener('click', async function(){
    
    
    //Verificando se há cupons inativos
    const cliente = await buscarClienteLogadoService();
    const cuponsInativos = await buscarCuponsInativosClienteIdService(cliente[0].clt_id);
    
    //Obtendo o select
    const select = document.querySelector('#cupons');

    if(cuponsInativos.length > 0){

        //Obetndo o ID do   
        const cup_id = select.selectedOptions[0].getAttribute('data-cup-id');

        //Ativando cupons
        const res = await ativarCupomService(cup_id);

        if(res === 200){
            window.location.reload();
            return;
        }

    }
});

//Removendo cupons já aplicados
document.querySelectorAll('.rm-cup').forEach(btn => {
    btn.addEventListener('click', async function(){
        const cupom = this.closest('.cupom');
    
        //Pegando o id do cupom
        const cup_id = cupom.querySelector('.cup-id').textContent;
        
        //Removendo os cupons aplicados
        const res = await inativarCupomService(cup_id);

        if(res === 200){
            window.location.reload();
            return;
        }

        alert('Não foi possível remover cupom aplicado');
    });
});

//Função que finaliza a compra
document.querySelector('.finalizar-compra').addEventListener('click', async function(){

    //Pegando os itens do carrinho
    const cliente = await buscarClienteLogadoService();
    const carrinho = await buscarCarrinhoClienteIdService(cliente[0].clt_id);

    //Obetendo o valor total da compra
    const valorTotal = Number(document.querySelector('.total').textContent.split('R$')[1].replace(',', '.'));


    //Preparando os dados a serem enviados
    carrinho.forEach(async item => {


        let valores = {
            clt_id: cliente[0].clt_id,
            lvr_id: item.crr_lvr_id,
            vnd_valorTotal: item.crr_total, 
            vnd_frete: 12
        } 

        //Adicionando os itens na tabela de vebdas
        const res = await adicionarPedidoService(valores);

        if(!res === 201){
            alert('Não foi possível finalizar a compra');
            return; 
        }

    });

    //Redirecionando para a página de pedidos
    window.location.href = '/pedidos';


});
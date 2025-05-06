import { deletarCupomIdService } from "/javaScript/service/compras/servicePagamento.js";
import { inativarCupomService } from "/javaScript/service/compras/servicePagamento.js";
import { ativarCupomService } from "/javaScript/service/compras/servicePagamento.js";
import { buscarCuponsAtivosClienteIdService } from "/javaScript/service/compras/servicePagamento.js";
import { buscarCuponsInativosClienteIdService } from "/javaScript/service/compras/servicePagamento.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { buscarCarrinhoClienteIdService } from "/javaScript/service/compras/serviceCarrinho.js";
import { adicionarPedidoService } from "/javaScript/service/compras/servicePedidos.js";
import { removerCarrinhoIdService } from "/javaScript/service/compras/serviceCarrinho.js";
import { desativarCartoesClienteIdService } from "/javaScript/service/clientes/serviceCard.js";

//Verficado se há cupons disponíveis ou não
document.addEventListener('DOMContentLoaded', async function(){

    //Obtendo o select
    const selectCupom = this.querySelector('#cupons');
    const selectCartao = this.querySelector('#cartao');

    if(!selectCupom.value){
        selectCupom.innerHTML = '';

        // Cria uma nova option com valor padrão
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'R$ 00,00';
        option.disabled = true;
        option.selected = true;

        selectCupom.appendChild(option);
    }    

    if(!selectCartao.value){
        selectCartao.innerHTML = '';

        // Cria uma nova option com valor padrão
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Nenhum Cartão Disponível';
        option.disabled = true;
        option.selected = true;


        selectCartao.appendChild(option);
    }
});

// Dividindo o valor a ser pago em cada cartão
document.addEventListener('DOMContentLoaded', function(){
    const containerCartoes = this.querySelector('.cartoes-adicionados');
    if(containerCartoes.innerHTML.trim() !== ''){
        
        //Pegando o valor total a ser pago
        const total = Number(this.querySelector('.total').textContent.split(' ')[2].replace(',', '.'));
        

        //Obtendo a qtd de cartões que estão adicionados
        const cartoes = containerCartoes.querySelectorAll('.wrapper');
        const valorPorCartao = (total / cartoes.length).toFixed(2); 

        //Adicionando valores para os cada cartão
        cartoes.forEach(cartao => {
            const inputValor = cartao.querySelector('.valor');
            inputValor.value = valorPorCartao;
        });

        return;
    }
});


//Adicionando múltiplos cartões
document.querySelector('.add-card').addEventListener('click', async function(event){

    event.preventDefault();

    //Obtendo dados
    const wrapper = event.target.closest('.container');
    const select = wrapper.querySelector('select').value;

    //Passando o id do cartão na URL para o back
    try{
        await fetch(`/pagamento?car_id=${select}`);
    }catch(err){
        console.error('Não foi possível enviar o ID do cartão');
        throw err;
    }

    //Recarregando a página
    window.location.reload();

});

//Removendo cartões que o cliente adicionou no pagamento
document.querySelectorAll('.rm-card').forEach(cartao => {
    cartao.addEventListener('click', async function(){

        //Obtendo o ID do cartão clicado
        const wrapper = this.closest('.wrapper');
        const car_id = wrapper.querySelector('.card-id').textContent;

        //Removendo o cartão
        try{
            await fetch(`/pagamento?car_id=${car_id}`);
        }catch(err){
            console.error('Não foi possível enviar o cartão para remoção');
            throw err;
        }

        //Recarregando a página
        window.location.reload();
        
    });
});

//Adicionando cupons que o cliente possui
document.querySelector('.add-cupom').addEventListener('click', async function(){
    
    //Obetendo o valor total da compra
    const valorTotal = Number(document.querySelector('.total').textContent.split('R$')[1].replace(',', '.'));

    //Verificando se há cupons inativos
    const cliente = await buscarClienteLogadoService();
    const cuponsInativos = await buscarCuponsInativosClienteIdService(cliente[0].clt_id);
    
    //Obtendo o select
    const select = document.querySelector('#cupons');
   
    if((valorTotal - select.value) < 10){
        alert('Cupom possui valor muito alto');
        return;
    }

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


//Gerando o número do pedido
function gerarNumeroPedido() {
    const hoje = new Date();
    const data = hoje.toISOString().slice(0,10).replace(/-/g, '');
    const aleatorio = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // 5 dígitos aleatórios
    return `PED-${data}-${aleatorio}`;
}

//Função que finaliza a compra
document.querySelector('.finalizar-compra').addEventListener('click', async function(){

    //Obetendo o valor total da compra
    const valorTotal = Number(document.querySelector('.total').textContent.split('R$')[1].replace(',', '.'));

    //Verificando se há cartões ativos
    const containerCartoes = document.querySelector('.cartoes-adicionados');
    let totalCard=0;
    let menoQue10;
    containerCartoes.querySelectorAll('.wrapper').forEach(card => {
        const inputValor = card.querySelector('.valor').value;

        if(inputValor < 10){
            menoQue10 = true;
            return;
        }

        totalCard += Number(inputValor);
    });

    //Validações para a compra
    if(menoQue10){
        alert('Valor a ser pago no cartão precisa ser maior ou igual a R$ 10,00.');
        return;
    }

    if(containerCartoes.innerHTML.trim() === ''){
        alert('Adicione um cartão para finalizar a compra.');
        return;
    }

    if(totalCard.toFixed(0) !== valorTotal.toFixed(0)){
        alert('O valor a ser pago no cartão precisa ser igual ao valor total da compra.');
        return;
    }


    //Pegando os itens do carrinho
    const cliente = await buscarClienteLogadoService();
    let carrinho = await buscarCarrinhoClienteIdService(cliente[0].clt_id);

    const urlParams = new URLSearchParams(window.location.search);
    const compra = urlParams.get('compra'); 

    //Finalizando o pedido se for uma compra única
    if(compra){
        
        //Obtendo o livro a ser comprado
        carrinho = carrinho.find(car => car.crr_lvr_id === Number(compra));
        
        //Gerando um número para o pedido
        const numPedido = gerarNumeroPedido();

        //Preparando os dados
        let valores = {
            clt_id: cliente[0].clt_id,
            lvr_id: carrinho.crr_lvr_id,
            lvr_numPedido: numPedido,
            vnd_valorTotal: carrinho.crr_total, 
            vnd_frete: 12,
            vnd_qtd: carrinho.crr_qtd
        }

        // Adicionando os itens na tabela de vendas
        const resAdd = await adicionarPedidoService(valores);
        const resRem = await removerCarrinhoIdService(carrinho.crr_lvr_id);

        //Verificando erros
        if(!resAdd === 201){
            alert('Não foi possível finalizar a compra');
            return; 
        }

        if(!resRem === 204){
            alert('Não foi possível retirar o livro do carrinho');
            return;
        }

    }else{
        
        //Finalizando pedido para múltiplos pedidos
        carrinho.forEach(async item => {

            //Gerando um número para cada pedido
            let numPedido = gerarNumeroPedido();

            //Preparando os dados
            let valores = {
                clt_id: cliente[0].clt_id,
                lvr_id: item.crr_lvr_id,
                lvr_numPedido: numPedido,
                vnd_valorTotal: item.crr_total, 
                vnd_frete: 12,
                vnd_qtd: item.crr_qtd
            } 

            //Adicionando os itens na tabela de vendas 
            const resAdd = await adicionarPedidoService(valores);
            const resRem = await removerCarrinhoIdService(item.crr_lvr_id);

            //Vericando erros
            if(!resAdd === 201){
                alert('Não foi possível finalizar a compra');
                return; 
            }

            if(!resRem === 204){
                alert('Não foi possível retirar o livro do carrinho');
                return;
            }

        });
    }

    //Removendo cupons usados pelo usuário
    const cuponsUsados = await buscarCuponsAtivosClienteIdService(cliente[0].clt_id);

    cuponsUsados.forEach(async cupom => {
        let resCupom = await deletarCupomIdService(cupom.cup_id);

        if(!resCupom === 204){
            alert('Não foi possível deletar o cupom');
            return;
        }
    });

    //Desativando os cartões
    const res = await desativarCartoesClienteIdService(cliente[0].clt_id);
    
    if(!res === 200){
        alert('Não foi possível desativar os cartões do usuário');
        return;
    }

    //Redirecionando para a página de pedidos
    alert('Compra realizada com sucesso!');
    window.location.href = '/pedidos';
});
import { buscarClienteLogadoService } from "../../service/clientes/serviceClientes.js"
import { adicionarCarrinhoService } from "../../service/compras/serviceCarrinho.js"

//Aumentado a quatidado do item
document.querySelector('.aumentar').addEventListener('click', function(){
    const contador = document.querySelector('#contador');
    contador.textContent = Number(contador.textContent) + 1;
});


//Diminuindo a quantidade do item
document.querySelector('.diminuir').addEventListener('click', function(){

    const contador = document.querySelector('#contador');
    if(Number(contador.textContent) > 0){
        contador.textContent = Number(contador.textContent) - 1;
    }
});


//Adicionando item ao carrinho
document.querySelector('.carrinho').addEventListener('click', async (event) => {

    event.preventDefault();

    //Preparando os dados
    const cliente = await buscarClienteLogadoService();
    const lvr_id = window.location.pathname.split('/').splice(-1)[0];
    const qtd = document.querySelector('#contador').textContent;

    const carrinho = {
        clt_id: cliente[0].clt_id,
        lvr_id: Number(lvr_id),
        qtd: Number(qtd)
    }

    //Adicionando no carrinho
    const res = await adicionarCarrinhoService(carrinho);
    
    if(res.status === 201){
        window.location.href = `/carrinho`;
        return;
    }

    alert('Não foi possível adicionar o item no carrinho');
    
});




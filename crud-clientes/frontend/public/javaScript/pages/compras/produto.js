import { buscarClienteLogadoService } from "../../service/clientes/serviceClientes.js"
import { adicionarCarrinhoService } from "../../service/compras/serviceCarrinho.js"



//Aumentado a quatidado do item
document.querySelector('.aumentar').addEventListener('click', function(){
    
    //Pegando o preço
    let preco = Number(document.querySelector('.preco').textContent.split('R$')[1].replace(',', '.'));
    
    const contador = document.querySelector('#contador');
    contador.textContent = Number(contador.textContent) + 1;
    preco += preco;

    console.log(preco);
});


//Diminuindo a quantidade do item
document.querySelector('.diminuir').addEventListener('click', function(){

    //Pegando o preço
    let preco = Number(document.querySelector('.preco').textContent.split('R$')[1].replace(',', '.'));

    const contador = document.querySelector('#contador');

    if(Number(contador.textContent) === 1){
        var precoBase = preco; 
    }
       

    if(Number(contador.textContent) > 1){
        contador.textContent = Number(contador.textContent) - 1;
        preco -= precoBase
    }

    console.log(preco);
});

//Adicionando item ao carrinho
async function addCarrinho(){

    //Preparando os dados
    const cliente = await buscarClienteLogadoService();
    const lvr_id = window.location.pathname.split('/').splice(-1)[0];
    const qtd = document.querySelector('#contador').textContent;

    const carrinho = {
        clt_id: cliente[0].clt_id,
        lvr_id: Number(lvr_id),
        crr_qtd: Number(qtd)
    }

    //Adicionando no carrinho
    const res = await adicionarCarrinhoService(carrinho);
    
    if(res.status === 201){
        window.location.href = `/carrinho`;
        return;
    }

    alert('Não foi possível adicionar o item no carrinho');
}

//Botões que adicionam o livro ao carrinho
document.querySelector('.carrinho').addEventListener('click', async (event) => {
    event.preventDefault();
    await addCarrinho();
});


document.querySelector('.comprar').addEventListener('click', async (event) => {
    event.preventDefault();
    await addCarrinho();
}); 




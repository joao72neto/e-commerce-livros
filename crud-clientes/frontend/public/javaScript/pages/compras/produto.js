import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { adicionarCarrinhoService, buscarCarrinhoClienteIdService } from "/javaScript/service/compras/serviceCarrinho.js";


//Verifica se o item já está no carrinho ou se o cliente está logado
document.addEventListener('DOMContentLoaded', async function(){

    const cliente = await buscarClienteLogadoService();  

    if(cliente.length === 0){
        return;
    }

    const lvr_id = window.location.pathname.split('/').splice(-1)[0];
    let carrinho = await buscarCarrinhoClienteIdService(cliente[0].clt_id);

    carrinho = carrinho.filter(livro => livro.lvr_id === Number(lvr_id));

    if(carrinho.length > 0){
        this.querySelector('.carrinho').textContent = 'No Carrinho';
    }
});

//Aumentado a quatidado do item
document.querySelector('.aumentar').addEventListener('click', function(){
        
    const contador = document.querySelector('#contador');
    contador.textContent = Number(contador.textContent) + 1;

});


//Diminuindo a quantidade do item
document.querySelector('.diminuir').addEventListener('click', function(){     

    if(Number(contador.textContent) > 1){
        contador.textContent = Number(contador.textContent) - 1;
    }
});


//Adicionando item ao carrinho
async function addCarrinho(path){


    //Pegando o preço do livro
    const preco = Number(document.querySelector('.preco').textContent.split('R$')[1].replace(',', '.'));

    //Preparando os dados
    const cliente = await buscarClienteLogadoService();
    const lvr_id = window.location.pathname.split('/').splice(-1)[0];
    const qtd = document.querySelector('#contador').textContent;

    const carrinho = {
        clt_id: cliente[0].clt_id,
        lvr_id: Number(lvr_id),
        crr_qtd: Number(qtd),
        crr_total: Number(qtd) * preco
    }

    //Adicionando no carrinho
    const res = await adicionarCarrinhoService(carrinho);
    
    if(res.status === 201){
        window.location.href = `${path}`;
        return;
    }

    alert('Não foi possível adicionar o item no carrinho');
}

//Adiciona um item no carrinho e redireciona para o carrinho
document.querySelector('.carrinho').addEventListener('click', async function (event){
    event.preventDefault();
    
    //Verificando se o cliente está logado ou não
    const cliente = await buscarClienteLogadoService(); 

    if(cliente.length === 0){
        alert('Cliente precisa está cadastrado para adicionar livros no carrinho');

        const res = confirm('Deseja se cadastrar?');

        if(!res){
            return;
        }

        window.location.href = '/clientes/signup?retorno=';
    }

    if(this.textContent.includes('No Carrinho')){
        window.location.href = '/carrinho';
        return;
    }
    
    await addCarrinho('/carrinho');
});


//Adicionar o item no carrino e vai para a página de pagamento
document.querySelector('.comprar').addEventListener('click', async (event) => {
    event.preventDefault();

    //Verificando se o cliente está logado ou não
    const cliente = await buscarClienteLogadoService(); 

    if(cliente.length === 0){
        alert('Cliente precisa está cadastrado para comprar livros');

        const res = confirm('Deseja se cadastrar?');

        if(!res){
            return;
        }

        window.location.href = '/clientes/signup?retorno=';
    }

    //Obtendo dados
    const noCarrinho = document.querySelector('.carrinho').textContent;
    const lvr_id = window.location.pathname.split('/').splice(-1)[0];

    if(noCarrinho.includes('No Carrinho')){
        window.location.href = `/pagamento?compra=${lvr_id}`;
        return;
    }
    
    await addCarrinho(`/pagamento?compra=${lvr_id}`);
}); 




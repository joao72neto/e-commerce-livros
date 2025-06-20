import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { adicionarCarrinhoService, buscarCarrinhoClienteIdService } from "/javaScript/service/compras/serviceCarrinho.js";

//Obtendo a quantidade disponíveel no estoque
const qtdEstoque = Number(document.querySelector('.qtd-estoque p').textContent.split(' ')[2]);

//Verifica se o item já está no carrinho ou se o cliente está logado
document.addEventListener('DOMContentLoaded', async function(){

    //Verificando se o Item já está no carrinho
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

    //Verificando a disponibilidade do estoque
    disponibilidadeEstoque();
});

//Função que verifica se ainda há itens no estoque
function disponibilidadeEstoque(){
    if(qtdEstoque === 0){

        //Personalizando a msg do estoque
        const estoque = document.querySelector('.qtd-estoque p');
        estoque.textContent = 'Indisponível';
        estoque.style.color = 'var(--preto)';

        //Desabilidatando os botões
        document.querySelector('.preco').remove();
        document.querySelector('.qtd').remove();
        document.querySelector('.opcoes').remove();
    }
}

//Aumentado a quatidado do item
document.querySelector('.aumentar').addEventListener('click', function(){
    
    //Obtendo os dados
    const contador = document.querySelector('#contador');
    const qtdContador = Number(contador.textContent);

    if((qtdContador + 1) > qtdEstoque){
        alert('Quantidade maior do que disponível no estoque');
        return;
    }

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

    //Verificando a qtd do contador
    const qtdContador = Number(document.querySelector('#contador').textContent);
    if(qtdContador > qtdEstoque){
        alert('Qtd selecionada acima da disponível no estoque');
        return;
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




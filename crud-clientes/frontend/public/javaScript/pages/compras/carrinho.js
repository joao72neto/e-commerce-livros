import { removerCarrinhoIdService } from "/javaScript/service/compras/serviceCarrinho.js";
import { atualizarQtdPrecoCarrinhoService } from "/javaScript/service/compras/serviceCarrinho.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js"


//Atualizando a qtd do livro no banco de dados
async function atualizarQtdPreco(lvr_id) {

    //Pegando os dados necessários
    const cliente = await buscarClienteLogadoService();
    const clt_id = Number(cliente[0].clt_id);

    //Organizando os dados
    const dados = {
        crr_qtd: Number(contador.textContent),
        lvr_id: lvr_id,
        clt_id: clt_id
    }

    //Atualizando os dados no banco
    const res = await atualizarQtdPrecoCarrinhoService(dados);

    if(res === 204){
        window.location.reload();
        return;
    }

    alert('Não foi possível atualizar a qtd do livro');
}

//Aumentado a quatidado do item
document.querySelectorAll('.aumentar').forEach(button => {
    button.addEventListener('click', async function(){

        //Pegando dados necessários
        const wrapper = this.closest('.wrapper');
        const lvr_id = Number(wrapper.querySelector('.book-id').textContent);
        const contador = wrapper.querySelector('#contador');

        //Atualizando a qtd
        contador.textContent = Number(contador.textContent) + 1;
        await atualizarQtdPreco(lvr_id);
    });
});


//Diminuindo a quantidade do item
document.querySelectorAll('.diminuir').forEach(button => {
    button.addEventListener('click', async function(){

        //Pegando os dados necessários
        const wrapper = this.closest('.wrapper');
        const lvr_id = Number(wrapper.querySelector('.book-id').textContent);
        const contador = wrapper.querySelector('#contador');

        //Atualizando a qtd
        if(Number(contador.textContent) > 1){
            contador.textContent = Number(contador.textContent) - 1;
            await atualizarQtdPreco(lvr_id);
        }
    });
});


//Redirecionando para a página do livro
document.querySelectorAll('.imagem').forEach(function(button){
    button.addEventListener('click', function(){

        //Obtendo o id do livro
        const wrapper = this.closest('.wrapper');
        const lvr_id = wrapper.querySelector('.book-id').textContent;


        window.location.href = `/produto/${lvr_id}`;
    });
});


//Removendo itens do carrinho
document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', async function(event){

        event.preventDefault();

        //Pegando o id do livro
        const wrapper = this.closest('.wrapper');
        const lvr_id = wrapper.querySelector('.book-id').textContent;

        const res = await removerCarrinhoIdService(lvr_id);

        if(res.status === 204){
            window.location.reload();
            return;
        }

        alert('Não foi possível remover o item');
    });
});



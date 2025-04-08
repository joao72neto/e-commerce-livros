import { removerCarrinhoIdService } from "/javaScript/service/compras/serviceCarrinho.js";

//Aumentado a quatidado do item
document.querySelectorAll('.aumentar').forEach(button => {
    button.addEventListener('click', function(){
        const wrapper = this.closest('.wrapper');
        const contador = wrapper.querySelector('#contador');

        contador.textContent = Number(contador.textContent) + 1;
    });
});


//Diminuindo a quantidade do item
document.querySelectorAll('.diminuir').forEach(button => {
    button.addEventListener('click', function(){
        const wrapper = this.closest('.wrapper');
        const contador = wrapper.querySelector('#contador');

        if(Number(contador.textContent) > 0){
            contador.textContent = Number(contador.textContent) - 1;
        }
    });
});


//Redirecionando para a página do livro
document.querySelectorAll('.imagem').forEach(function(button){
    button.addEventListener('click', function(){
        window.location.href = '/produto';
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



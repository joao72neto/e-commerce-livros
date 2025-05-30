import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { adicionarCarrinhoService, buscarCarrinhoClienteIdService } from "/javaScript/service/compras/serviceCarrinho.js";


//Mostrando o menu lateral
document.querySelector('#btn-sidebar').addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('header');
    const conteudo = document.querySelector('.conteudo');
    const footer = document.querySelector('footer');
    const chat = document.querySelector('.chat');
    const chatButton = document.querySelector('.chat-button');

    console.log(chat);


    if(!sidebar.classList.contains('aberta')){
        sidebar.classList.add('aberta');
        header.style.position = 'sticky';
        header.style.top = '0';
        chat.style.right = '37%';
        chatButton.style.right = '31%';
        conteudo.style.width = '70%';
        footer.style.width = '70%';
        return;
    }

    sidebar.classList.remove('aberta');
    chat.style.right = '100px';
    chatButton.style.right = '5px';
    footer.style.width = '';
    header.style.position = '';
    conteudo.style.width = '';
});


//Exibindo notificações
document.querySelector('#notificacao-index').addEventListener('click', function(event){
    event.stopPropagation();
        

    //Retirando o menu ao clicar de novo
    let notificacao = this.querySelector('.notificacao');

    if(notificacao){
        notificacao.remove();
        return;
    }

    let submenu = document.createElement('div');
    submenu.classList.add('notificacao');


    submenu.innerHTML = `
        <a href="#">Troca do produto Aceita</a>
        <a href="#">Item adicionado ao carrinho</a>
        <a href="#">Item retirado do carrinho</a>

    `;

    // Adicionando submenu ao lado do botão clicado
    this.appendChild(submenu);

});

//Removendo notificação ao clicar fora da tela
document.addEventListener('click', function(){
    const notificacao = document.querySelector('.notificacao');

    if(notificacao){
        notificacao.remove();
    }
});

//Redirecionando para a página de produtos
document.querySelectorAll('.imagem').forEach(image => {
    image.addEventListener('click', function(){

        //Obetendo o id do livro
        const book = this.closest('.book');
        const lvr_id = book.querySelector('.book-id').textContent;
        
        window.location.href = `/produto/${lvr_id}`;
    });
});


//função que adicione o item no carrinho
async function addCarrinho(lvr_id){

    //Verificando se o item já está no carrinho
    const cliente = await buscarClienteLogadoService();
    let carrinhoCliente = await buscarCarrinhoClienteIdService(cliente[0].clt_id);

    carrinhoCliente = carrinhoCliente.find(car => car.lvr_id === Number(lvr_id));


    if(carrinhoCliente){
        window.location.href = `/pagamento?compra=${lvr_id}`;
        return;
    }

    //Pegando o preço do livro
    let preco;
    document.querySelectorAll('.book').forEach(book => {
            
        if(book.querySelector('.book-id').textContent === lvr_id){
            preco = Number(book.querySelector('.preco').textContent.split('R$')[1].replace(',', '.'));
            return;
        }
    });

    const carrinho = {
        clt_id: cliente[0].clt_id,
        lvr_id: Number(lvr_id),
        crr_qtd: 1,
        crr_total: Number(preco)
    }

    //Adicionando no carrinho
    const res = await adicionarCarrinhoService(carrinho);
    
    if(res.status === 201){
        window.location.href = `/pagamento?compra=${lvr_id}`;
        return;
    }

    alert('Não foi possível adicionar o item no carrinho');
}

//Adicionando funcionalidade para o botão de compra
document.querySelectorAll('.compra').forEach(button => {
    button.addEventListener('click', async function(){

        //Obtendo o id do livro clicado
        const wrapper = this.closest('.book');
        const lvr_id = wrapper.querySelector('.book-id').textContent;

        await addCarrinho(lvr_id);
 
    });
});
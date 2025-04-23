
//Mostrando o menu lateral
document.querySelector('#btn-sidebar').addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('header');
    const conteudo = document.querySelector('.conteudo');
    const footer = document.querySelector('footer');


    if(!sidebar.classList.contains('aberta')){
        sidebar.classList.add('aberta');
        header.style.position = 'sticky';
        header.style.top = '0';
        conteudo.style.width = '70%';
        footer.style.width = '70%';
        return;
    }

    sidebar.classList.remove('aberta');
    footer.style.width = '';
    header.style.position = '';
    conteudo.style.width = '';
});


//Exibindo notificações
document.querySelector('#notificacao-index').addEventListener('click', function(event){
    event.stopPropagation();
        

    //Retirando o menu ao clicar de novo
    let notificacao = this.querySelector('.notificacaoa');

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

//Mostrando o menu lateral
document.querySelector('#btn-sidebar').addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('header');

    const html = `
    
        <h2 for="">Cliente</h2>
        <ul>
            <li><a href="/clientes/signup?retorno=">Cadastro</a></li>
        </ul>
        <h2 for="">ADM</h2>
        <ul>
            <li><a href="/clientes">Gerenciar Clientes</a></li>
            <li><a href="/pedidos/gerenciar">Gerenciar Pedidos</a></li>
            <li><a href="/vendas/historico">Histórico de Vendas</a></li>
            <li><a href="/estoque">Controle de Estoque</a></li>
            <li><a href="/logs">Logs</a></li>
        </ul>
     
    `;

    if(sidebar.innerHTML.trim() === ''){
        header.style.position = 'sticky';
        header.style.top = '0';
        header.style.width = '100%'
        sidebar.style.top = '65px';
        sidebar.style.padding = '20px';
        sidebar.innerHTML = html;
        return;
    }

    header.style.position = '';
    sidebar.style.padding = '0';
    sidebar.innerHTML = '';
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
    document.querySelector('.notificacao').remove();
});

//Redirecionando para a página de produtos
document.querySelectorAll('.imagem').forEach(image => {
    image.addEventListener('click', function(){
        window.location.href = '/produto';
    });
});
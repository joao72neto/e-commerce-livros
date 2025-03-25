
//Mostrando o menu lateral
document.querySelector('#btn-sidebar').addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('header');

    const html = `
    
        <h2 for="">Cliente</h2>
        <ul>
            <li><a href="/perfil">Perfil</a></li>
            <li><a href="/cadastro">Cadastro</a></li>
            <li><a href="/pedidos">Meus Pedidos</a></li>
        </ul>
        <h2 for="">ADM</h2>
        <ul>
            <li><a href="/clientes">Gerenciar Clientes</a></li>
            <li><a href="/pedidos/gerenciar">Gerenciar Pedidos</a></li>
            <li><a href="/vendas/historico">Histórico de Vendas</a></li>
            <li><a href="/logs">Logs</a></li>
        </ul>
     
    `;

    if(sidebar.innerHTML.trim() === ''){
        header.style.position = 'fixed';
        header.style.width = '100%'
        sidebar.style.top = '55px';
        sidebar.style.padding = '20px';
        sidebar.innerHTML = html;
        return;
    }

    header.style.position = '';
    sidebar.style.padding = '0';
    sidebar.innerHTML = '';
});
import { buscarClientesAtivosService } from "/javaScript/service/clientes/serviceClientes.js";
import { buscarClientesInativosService } from "/javaScript/service/clientes/serviceClientes.js";
import { inativarClienteService } from "/javaScript/service/clientes/serviceClientes.js";


//FILTRO DE CLIENTES
document.querySelector('#flt').addEventListener('click', () => {

    const filtro = document.querySelector('.filtro_clientes');

    //Alterando a visibilidade do filtro
    if(filtro.style.display === 'none' || filtro.style.display === ''){
        filtro.style.display = 'grid';
        return;
    }

    filtro.style.display = 'none';

});

//ALTERALÇÃO DE USUÁRIO
document.querySelectorAll('.alt').forEach(botao => {
    botao.addEventListener('click', function (event) {

        event.stopPropagation();
        
        //Obetendo o id
        let clienteWrapper = this.closest('.cliente-wrapper');
        let id = clienteWrapper.querySelector('.cliente-id').textContent;

        //Retirando o menu ao clicar de novo
        let submenuAtual = this.querySelector('.alt_submenu');

        if(submenuAtual){
            submenuAtual.remove();
            return;
        }

        document.querySelectorAll('.alt_submenu').forEach(menu => menu.remove());

        let submenu = document.createElement('div');
        submenu.classList.add('alt_submenu');

        submenu.innerHTML = `
            <a href="/password/${id}">Alterar senha</a>
            <a href="/address/${id}">Alterar endereço</a>
            <a href="/card/${id}">Alterar pagamento</a>
            <a href="/signup/${id}">Alterar tudo</a>

        `;

        // Adicionando submenu ao lado do botão clicado
        this.appendChild(submenu);

    });
});


//Removendo o submenu ao clicar fora da tela
document.addEventListener('click', () => {
    document.querySelectorAll('.alt_submenu').forEach(menu => menu.remove());
});


//DESATIVANDO CLIENTES
document.querySelectorAll('.inat').forEach(button => {
    button.addEventListener('click', async function(){

        let clienteWrapper = this.closest('.cliente-wrapper');
        let id = clienteWrapper.querySelector('.cliente-id').textContent;

        const status = await inativarClienteService(id);

        if(status === 204){
            location.reload();
        }
    });
});


//Função que cria um botão dinânimo para a tela de inativos
export function criarBotaoInativados() {
    if (!document.getElementById('btn-inativados')) {
        let botao = document.createElement('a');
        botao.id = 'btn-inativados';
        botao.href = '/inativos'; 
        botao.textContent = 'Ver Inativados';
        botao.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
        `;

        document.body.appendChild(botao);
    }
}

// Mostrar o botão automaticamente se já houver inativos
let clientesInativos = await buscarClientesInativosService();

if (clientesInativos.length > 0) {
    criarBotaoInativados();
}


//TRANSAÇÕES
document.querySelectorAll('.tran').forEach(button => {

    button.addEventListener('click', function(){

        let clienteWrapper = this.closest('.cliente-wrapper');
        let id = clienteWrapper.querySelector('.cliente-id').textContent;

        window.location.href = `/transacoes/${id}`;
    });
});

//CLIENTES ATIVOS

//Personalizando uma msg para quando não houver clientes ativos
let clientesAtivos = await buscarClientesAtivosService();

if (clientesAtivos.length === 0) {
    let container = document.querySelector('.msg-clientes');
    container.innerHTML = '<h1 style="margin: 0">Nenhum Cliente Ativo</h1>';
    container.style.padding = '40px';
}

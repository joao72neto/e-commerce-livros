import { buscarClientesAtivosService } from "/javaScript/service/clientes/serviceClientes.js";
import { buscarClientesInativosService } from "/javaScript/service/clientes/serviceClientes.js";
import { inativarClienteService } from "/javaScript/service/clientes/serviceClientes.js";
import { mascarasFiltro, validarFiltro } from "/javaScript/validations/clientes/validacoesFiltro.js";

mascarasFiltro();

//FILTRO

// Mantendo o filtro aberto
window.addEventListener('load', () => {
    if (window.location.search.includes('?')) {

        document.querySelector('.filtro_clientes').style.display = 'grid';

    } else {
        document.querySelector('.filtro_clientes').style.display = 'none';
    }
});


//Abrindo e fechandoo filtro 
document.querySelector('#flt').addEventListener('click', () => {

    const filtro = document.querySelector('.filtro_clientes');

    //Alterando a visibilidade do filtro
    if(filtro.style.display === 'none' || filtro.style.display === ''){
        filtro.style.display = 'grid';
        return;
    }

    filtro.style.display = 'none';

});

//Adicionando funcionamendo do filtro
document.querySelector('#btn-filtro').addEventListener('click', (event) => {

    event.preventDefault();

    //Selecionando o formulário do filtro
    const form = document.querySelector('.filtro_clientes');

    //Obetndo os dados
    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const dataNasc = document.getElementById("dataNasc").value;
    const telefone = document.getElementById("telefone").value;


    //Montando a url
    let url = '/clientes?';
    if (nome) url += `clt_nome=${encodeURIComponent(nome)}&`;
    if (genero) url += `clt_genero=${encodeURIComponent(genero)}&`;
    if (email) url += `clt_email=${encodeURIComponent(email)}&`;
    if (cpf) url += `clt_cpf=${encodeURIComponent(cpf)}&`;
    if (dataNasc) url += `clt_dataNasc=${encodeURIComponent(dataNasc)}&`;
    if (telefone) url += `clt_telefone=${encodeURIComponent(telefone)}&`;

    url = url.slice(0, -1);

    if(!validarFiltro(event, form)){
        return;
    }

    //Filtrando os dados
    window.location.href = url;

});


//Logando usuário


//ALTERALÇÃO DE USUÁRIO
document.querySelectorAll('.alt').forEach(botao => {
    botao.addEventListener('click', function (event) {

        event.stopPropagation();
      
        
        //Obetendo o id
        let clienteWrapper = this.closest('.wrapper');
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
            <a href="/clientes/password/${id}">Alterar senha</a>
            <a href="/clientes/address/${id}">Alterar endereço</a>
            <a href="/clientes/card/${id}">Alterar pagamento</a>
            <a href="/clientes/signup/${id}">Alterar tudo</a>

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

        let clienteWrapper = this.closest('.wrapper');
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
        botao.href = '/clientes/inativos'; 
        botao.textContent = 'Ver Inativados';
        botao.style.cssText = `
            position: fixed;
            bottom: 70px;
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

        let clienteWrapper = this.closest('.wrapper');
        let id = clienteWrapper.querySelector('.cliente-id').textContent;

        window.location.href = `/clientes/transacoes/${id}`;
    });
});

//CLIENTES ATIVOS

//Personalizando uma msg para quando não houver clientes ativos
let clientesAtivos = await buscarClientesAtivosService();

if (clientesAtivos.length === 0) {
    let container = document.querySelector('.msg-clientes');
    container.innerHTML = '<h1 style="margin: 0">Nenhum Cliente Ativo</h1>';
    container.style.cssText = `
        background-color: var(--cinza);
        padding: 30px;
        margin: 20px 0;
        border-radius: 20px
    `;
}



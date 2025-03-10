import { buscarClientesAtivosService } from "/javaScript/service/serviceClientes.js";
import { buscarClientesInativosService } from "/javaScript/service/serviceClientes.js";
import { inativarClienteService } from "/javaScript/service/serviceClientes.js";

//FILTRANDO CLIENTES
let filtro_clientes = document.querySelector('.filtro_clientes');
let filtro = ` <select name="nomes" id="nomes">
                    <option value="nome">Nome</option>
                    <option value="joaldo">Joel</option>
                    <option value="jose">Renato</option>
                    <option value="joel">João Neto</option>
                    <option value="joel">Lucas</option>
                </select>

                <select name="paises" id="paises">
                    <option value="pais">País</option>
                    <option value="brasil">Brasil</option>
                    <option value="espanha">Espanha</option>
                    <option value="eua">EUA</option>
                </select>

                <select name="estados" id="estados">
                    <option value="estado">Estado</option>
                    <option value="sp">São Paulo</option>
                    <option value="mg">Minas Gerais</option>
                    <option value="mt">Mato Grosso</option>
                </select>

                <select name="cidades" id="cidades">
                    <option value="cidade">Cidade</option>
                    <option value="guararema">Guararema</option>
                    <option value="poa">Poá</option>
                    <option value="mogi">Mogi</option>
                </select>`;

let input = `<input class="busca_clientes" type="text" placeholder="Busque clientes...">`

//Filtro
document.querySelector('#flt').addEventListener('click', () => {
    
    
    if(filtro_clientes.innerHTML.trim() === '' || 
       filtro_clientes.innerHTML === input){

        filtro_clientes.style.padding = '30px';
        document.querySelector('.filtro_clientes').innerHTML = filtro;

        
    }else{
        filtro_clientes.innerHTML = '';
        filtro_clientes.style.padding = '10px';
    }
});

//Input
document.querySelector('#bsc').addEventListener('click',() => {

    if(filtro_clientes.innerHTML.trim() === '' ||
       filtro_clientes.innerHTML === filtro){

        filtro_clientes.style.padding = '30px';
        filtro_clientes.innerHTML = input;

        
    }else{
        filtro_clientes.innerHTML = '';
        filtro_clientes.style.padding = '10px';
    }
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
function criarBotaoInativados() {
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
    container.innerHTML = '<h1 style="margin: 0">Nunhum Cliente Ativo</h1>';
    container.style.padding = '40px';
}

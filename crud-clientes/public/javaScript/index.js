//MOSTRANDO CLIENTES ATIVOS
const container_index = document.querySelector('.container-index');

//Guardando os dados no sessionStorage
let clientesInativos = JSON.parse(sessionStorage.getItem('clientesInativos')) || [];
let clientesAtivos = JSON.parse(sessionStorage.getItem('clientesAtivos')) || 

[
    { nome: 'João Neto', email: 'joao72neto@gmail.com' },
    { nome: 'Lucas', email: 'lucas.silva@gmail.com' },
    { nome: 'Joel', email: 'joel.dias@gmail.com' },
    { nome: 'Renato', email: 'renato.souza@gmail.com' }
 
];


clientesAtivos.forEach(cliente => {
    let div = document.createElement('div');
    div.classList.add('cliente-wrapper');
    div.innerHTML = `
    
        <div class="cliente">
            <p>${cliente.nome}</p>
            <p>${cliente.email}</p>
        </div>
        <div class="acoes">
            <a class="alt" href="#">Alterar</a>
            <a class="inat" href="#">Inativar</a>
            <a class="tran" href="#">Transações</a>
        </div>
    `;

    container_index.appendChild(div);
});


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
    botao.addEventListener('click', function () {

        // Verificando se o menu já existe
        let submenuExiste = document.querySelectorAll('.alt_submenu').forEach(menu => {
            if(menu){
                menu.remove();
            }

            let thisSubmenuExiste = document.querySelectorAll('.alt_submenu');

            if(thisSubmenuExiste){
                thisSubmenuExiste.remove();
            }

            return;
        });

        let submenu = document.createElement('div');
        submenu.classList.add('alt_submenu');

        submenu.innerHTML = `
            <a href="/password">Alterar senha</a>
            <a href="/address">Alterar endereço</a>
            <a href="/card">Alterar pagamento</a>
            <a href="/signup">Alterar tudo</a>

        `;

        // Adicionando submenu ao lado do botão clicado
        this.appendChild(submenu);

    });
});

//DESATIVANDO CLIENTES
document.querySelectorAll('.inat').forEach(button => {
    button.addEventListener('click', function(){

        let clienteWrapper = this.closest('.cliente-wrapper');

        if(clienteWrapper){
            let nome = clienteWrapper.querySelector('p:nth-child(1)').textContent;
            let email = clienteWrapper.querySelector('p:nth-child(2)').textContent;
            let cliente = {nome:nome, email:email};

            clientesInativos.push(cliente);
            clientesAtivos = clientesAtivos.filter(c => c.email !== cliente.email);

            sessionStorage.setItem('clientesInativos', JSON.stringify(clientesInativos));
            sessionStorage.setItem('clientesAtivos', JSON.stringify(clientesAtivos));
            
            //Removendo o cliente
            clienteWrapper.remove();

            //Criando um botão para a página de inativos
            criarBotaoInativados();
        }
  
    });
});

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
if (clientesInativos.length > 0) {
    criarBotaoInativados();
}


//TRANSAÇÕES
function pegarDados(obj){
    let clienteWrapper = obj.closest('.cliente-wrapper');

        if (clienteWrapper) {
            let clienteNome = clienteWrapper.querySelector("p:nth-child(1)").textContent;
            let clienteEmail = clienteWrapper.querySelector("p:nth-child(2)").textContent;

            let cliente = {nome: clienteNome, email: clienteEmail };

            // Armazena os dados do cliente no sessionStorage
            sessionStorage.setItem("clienteTransacoes", JSON.stringify(cliente));
   
        }
}

document.querySelectorAll('.tran').forEach(botao => {
    botao.addEventListener('click', function() {
        pegarDados(this);
        window.location.href = "/transacoes";
    });
});

// ADICIONANDO UM POP-UP COM OS DADOS DO CLIENTE
document.querySelectorAll('.cliente-wrapper .cliente').forEach(wrapper => {
    wrapper.addEventListener('click', function(){

        let containerIndex = document.querySelector('.container-index');
        let popupExistente = document.querySelector('.popup');

        if (popupExistente) {
            
            popupExistente.remove();
        } else {
            // Criando o popup
            let popup = document.createElement('div');
            popup.classList.add('popup');

            // Pegando os dados do cliente
            pegarDados(this);
            let dados = JSON.parse(sessionStorage.getItem('clienteTransacoes'));

            popup.innerHTML = `
                <div class="button-popup">
                    <button>X</button>
                </div>
                <h2>Dados de ${dados.nome}</h2>
                <p><strong>Nome Completo: </strong>João Salvador Neto<p/>
                <p><strong>E-mail: </strong>${dados.email}<p/>
                <p><strong>Telefone: </strong>(55) 11 9453-2245<p/>
                <p><strong>CPF: </strong>486.904.748.97<p/>
                <p><strong>Gênero: </strong>Masculino<p/>
                <p><strong>Data Nascimento: </strong>19/07/2004<p/>
                <p><strong>E-mail: </strong>joao72neto@gmail.com<p/>
            `;

            containerIndex.appendChild(popup);

            // Evento para fechar o popup ao clicar no botão "X"
            document.querySelector('.button-popup button').addEventListener('click', function(){
                popup.remove();
            });
        }
    });
});





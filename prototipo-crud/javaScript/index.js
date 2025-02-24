//Mostrando clientes ativos
let container_index = document.querySelector('.container-index');

//Guardando os dados no sessionStorage
let clientesInativos = JSON.parse(sessionStorage.getItem('clientesInativos')) || [];
let clientesAtivos = JSON.parse(sessionStorage.getItem('clientesAtivos')) || 

[
    { nome: 'João Neto', email: 'joao72neto@gmail.com' },
    { nome: 'Josel', email: 'josel.ohh@gmail.com' },
 
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


//FILTERING CLIENTS
let filtro_clientes = document.querySelector('.filtro_clientes');
let filtro = ` <select name="nomes" id="nomes">
                    <option value="nome">Nome</option>
                    <option value="joaldo">Joaldo</option>
                    <option value="jose">José</option>
                    <option value="joel">Joel</option>
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

//Searching for clients
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

//CHANGING USER
document.querySelectorAll('.alt').forEach(botao => {
    botao.addEventListener('click', function (event) {
        event.preventDefault();

        // Verifica se já existe um submenu ativo
        let submenu = this.parentElement.querySelector('.alt_submenu');

        if (!submenu) {
            // Criando submenu dinamicamente
            submenu = document.createElement('div');
            submenu.classList.add('alt_submenu');

            submenu.innerHTML = `
                <a href="password.html">Alterar senha</a>
                <a href="address/address-main.html">Alterar endereço</a>
                <a href="card/card-main.html">Alterar pagamento</a>
                <a href="signup.html">Alterar tudo</a>
            `;

            // Adicionando submenu ao lado do botão clicado
            this.parentElement.appendChild(submenu);
        }

        // Alterna a visibilidade do submenu
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
});

//DEACTIVATING CLIENTS
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
    if (!document.getElementById("btn-inativados")) {
        let botao = document.createElement("a");
        botao.id = "btn-inativados";
        botao.href = "inativos.html"; 
        botao.textContent = "Ver inativados";
        botao.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
        `;

        document.body.appendChild(botao);
    }
}

// Mostrar o botão automaticamente se já houver inativos
clientesInativos = JSON.parse(sessionStorage.getItem("clientesInativos")) || [];
if (clientesInativos.length > 0) {
    criarBotaoInativados();
}


//TRANSACTIONS
document.querySelectorAll('.tran').forEach(botao => {
    botao.addEventListener('click', function() {

        let clienteWrapper = this.closest('.cliente-wrapper');

        if (clienteWrapper) {
            let clienteNome = clienteWrapper.querySelector("p:nth-child(1)").textContent;
            let clienteEmail = clienteWrapper.querySelector("p:nth-child(2)").textContent;

            let cliente = {nome: clienteNome, email: clienteEmail };

            // Armazena os dados do cliente no localStorage
            sessionStorage.setItem("clienteTransacoes", JSON.stringify(cliente));

            // Redireciona para a página de transações
            window.location.href = "transacoes.html";
        }
    });
});




import { buscarClienteIdService } from '/javaScript/service/clientes/serviceClientes.js';

//Popup que mostra todos os dados do cliente cadastrado
document.querySelectorAll('.wrapper .cliente').forEach(function(cliente){
    cliente.addEventListener('click', async function(){

        let container = document.querySelector('.container-index');
        let id = Number(this.querySelector('.cliente-id').textContent);

        // Criando o popup
        let popup = document.createElement('div');
        popup.classList.add('popup');
    
        let cliente = await buscarClienteIdService(id);

        //Mostrando todos os dados
        popup.innerHTML = `
            <div class="button-popup">
                <button>X</button>
            </div>
            <h2>Dados de ${cliente.clt_nome.split(' ')[0]}</h2>
            <p><strong>Nome Completo: </strong>${cliente.clt_nome}<p/>
            <p><strong>E-mail: </strong>${cliente.clt_email}<p/>
            <p><strong>Telefone: </strong>${cliente.clt_telefone}<p/>
            <p><strong>CPF: </strong>${cliente.clt_cpf}<p/>
            <p><strong>Gênero: </strong>${cliente.clt_genero}<p/>
            <p><strong>Data Nascimento: </strong>${cliente.clt_dataNasc}<p/>
            <p><strong>Ranking: </strong>${cliente.clt_ranking}<p/>
        `;

        container.appendChild(popup);

        // Evento para fechar o popup ao clicar no botão "X"
        document.querySelector('button').addEventListener('click', () => {
            popup.remove();
        });
    });
});

//Removendo o submenu ao clicar fora da tela
document.addEventListener('click', () => {
    const popup = document.querySelector('.popup');
    if(popup){
        popup.remove();
    }
});






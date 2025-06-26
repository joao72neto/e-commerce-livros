import { buscarClienteIdService } from '/javaScript/service/clientes/serviceClientes.js';

document.addEventListener('DOMContentLoaded', function(){

    //Calling functions
    showPopup();
    removePopup();
});

function showPopup() {
    document.querySelectorAll('.wrapper .cliente').forEach(function (cliente) {
        cliente.addEventListener('click', async function (event) {
            event.stopPropagation();

            const existingPopup = this.querySelector('.popup');
            if (existingPopup) {
                existingPopup.remove();
                return;
            }

            // Fecha qualquer outro popup aberto
            document.querySelectorAll('.popup').forEach(p => p.remove());

            let id = Number(this.querySelector('.cliente-id').textContent);

            // Criando o popup
            let popup = document.createElement('div');
            popup.classList.add('popup');

            let cliente = await buscarClienteIdService(id);
            cliente.clt_dataNasc = new Date(cliente.clt_dataNasc).toLocaleDateString('pt-BR');

            popup.innerHTML = `
                <h2>Dados de ${cliente.clt_nome.split(' ')[0]}</h2>
                <p><strong>Nome Completo: </strong>${cliente.clt_nome}</p>
                <p><strong>E-mail: </strong>${cliente.clt_email}</p>
                <p><strong>Telefone: </strong>${cliente.clt_telefone}</p>
                <p><strong>CPF: </strong>${cliente.clt_cpf}</p>
                <p><strong>Gênero: </strong>${cliente.clt_genero}</p>
                <p><strong>Data Nascimento: </strong>${cliente.clt_dataNasc}</p>
                <p><strong>Ranking: </strong>${cliente.clt_ranking}</p>
            `;

            this.appendChild(popup);
        });
    });
}

function removePopup() {
    document.addEventListener('click', (event) => {
        const isClickInsideCliente = event.target.closest('.cliente');
        const popup = document.querySelector('.popup');

        if (!isClickInsideCliente && popup) {
            popup.remove();
        }
    });
}

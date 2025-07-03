import { buscarClienteIdService } from '/javaScript/service/clientes/serviceClientes.js';
import { buscarRankingService } from '/javaScript/service/analise/serviceHistoricoVendas.js';

document.addEventListener('DOMContentLoaded', function(){

    //Calling functions
    showPopup();
    removePopup();
});

function showPopup() {
    document.querySelectorAll('.wrapper .cliente').forEach(function (cliente) {
        cliente.addEventListener('click', async function (event) {
            event.stopPropagation();

            const filter = document.body.querySelector('.filtro_clientes')
            const existingPopup = document.body.querySelector('.popup');

            if (existingPopup) {

                const popupId = existingPopup.querySelector('#popup-id').textContent;
                const clientId = this.querySelector('.cliente-id').textContent;

                if(clientId === popupId){
                    filter.classList.remove('invisible');
                    existingPopup.remove();
                    return;
                }
            }

            // Fecha qualquer outro popup aberto
            document.querySelectorAll('.popup').forEach(p => p.remove());

            let id = Number(this.querySelector('.cliente-id').textContent);

            // Criando o popup
            let popup = document.createElement('div');
            popup.classList.add('popup');

            let cliente = await buscarClienteIdService(id);
            cliente.clt_dataNasc = new Date(cliente.clt_dataNasc).toLocaleDateString('pt-BR');

            let ranking = await getRanking(cliente.clt_id);

            popup.innerHTML = `
                <h2>Dados de ${cliente.clt_nome.split(' ')[0]}</h2>
                <p class="invisible" id="popup-id">${cliente.clt_id}</p>
                <p><strong>Nome Completo: </strong>${cliente.clt_nome}</p>
                <p><strong>E-mail: </strong>${cliente.clt_email}</p>
                <p><strong>Telefone: </strong>${cliente.clt_telefone}</p>
                <p><strong>CPF: </strong>${cliente.clt_cpf}</p>
                <p><strong>Gênero: </strong>${cliente.clt_genero}</p>
                <p><strong>Data Nascimento: </strong>${cliente.clt_dataNasc}</p>
                <hr>
                <div class="ranking">
                    <h3>Ranking</h3>
                    <p>Posição: ${ranking.position}</p>
                    <p>Total Gasto: ${ranking.total_spent}</p>
                </div>
            `;

            filter.classList.add('invisible');
            document.body.appendChild(popup);
        });
    });
}

async function getRanking(clt_id){
    const ranking = await buscarRankingService(clt_id);

    if(ranking.length > 0){
        return {
            position: ranking[0].position,
            total_spent:'R$ ' + String(ranking[0].total_spent).replace('.', ',')
        }
    }

    return {
        position: 'Realize uma compra para calcular',
        total_spent: 'R$ 00,00'
    }
}

function removePopup() {
    document.addEventListener('click', (event) => {
        const popup = document.querySelector('.popup');
        const filter = document.body.querySelector('.filtro_clientes');

        if (popup && !popup.contains(event.target)) {
            filter.classList.remove('invisible');
            popup.remove();
        }
    });
}

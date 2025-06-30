import { buscarEnderecoIdService } from '/javaScript/service/clientes/serviceAddress.js';

document.addEventListener('DOMContentLoaded', function(){
    
    //Calling functions
    showPopup();
    removePopup();

});

function showPopup(){
    document.querySelectorAll('.endereco-wrapper .endereco').forEach(endereco => {
        endereco.addEventListener('click', async function(event){
            event.stopPropagation();

            const existingPopup = document.body.querySelector('.popup');
            if (existingPopup) {

                const popupId = existingPopup.querySelector('#popup-id').textContent;
                const clientId = this.querySelector('.address-id').textContent;

                if(clientId === popupId){
                    existingPopup.remove();
                    return;
                }
            }
            // Fecha qualquer outro popup aberto
            document.querySelectorAll('.popup').forEach(p => p.remove());

            let id = Number(this.querySelector('.address-id').textContent);

            // Criando o popup
            let popup = document.createElement('div');
            popup.classList.add('popup');

            let endereco = await buscarEnderecoIdService(id);

            //Mostrando todos os dados
            popup.innerHTML = `
                <h2>${endereco.end_logradouro}</h2>
                <p class="invisible" id="popup-id">${endereco.end_id}<p/>
                <p><strong>Nome: </strong>${endereco.end_nome}<p/>
                <p><strong>Tipo de Residência: </strong>${endereco.end_tipoResidencia}<p/>
                <p><strong>Tipo de Logradouro: </strong>${endereco.end_tipoLogradouro}<p/>
                <p><strong>Logradouro: </strong>${endereco.end_logradouro}<p/>
                <p><strong>Número: </strong>${endereco.end_numero}<p/>
                <p><strong>Bairro: </strong>${endereco.end_bairro}<p/>
                <p><strong>CEP: </strong>${endereco.end_cep}<p/>
                <p><strong>Cidade: </strong>${endereco.end_cidade}<p/>
                <p><strong>Estado: </strong>${endereco.end_estado}<p/>
                <p><strong>País: </strong>${endereco.end_pais}<p/>
            `;

            //Adding popup to body
            document.body.appendChild(popup);
        });
    });
};

function removePopup(){
    //Removendo o submenu ao clicar fora da tela
    document.addEventListener('click', (event) => {
        const popup = document.querySelector('.popup');

        if (popup && !popup.contains(event.target)) {
            popup.remove();
        }
    });
}

import { buscarEnderecoIdService } from '/javaScript/service/clientes/serviceAddress.js';

//Gerando um popup para os endereços
document.querySelectorAll('.endereco-wrapper .endereco').forEach(endereco => {
    endereco.addEventListener('click', async function(){

        let container = document.querySelector('.container-address');
        let id = Number(this.querySelector('.address-id').textContent);

        // Criando o popup
        let popup = document.createElement('div');
        popup.classList.add('popup');

        let endereco = await buscarEnderecoIdService(id);

        //Mostrando todos os dados
        popup.innerHTML = `
            <div class="button-popup">
                <button>X</button>
            </div>
            <h2>${endereco.end_logradouro}</h2>
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





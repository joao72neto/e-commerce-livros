import { pegarEnderecoId } from '/javaScript/service/serviceAddress.js';

//Gerando um popup para os endereços
document.querySelectorAll('.endereco-wrapper .endereco').forEach(endereco => {
    endereco.addEventListener('click', async function(){

        let containerAddress = document.querySelector('.container-address');
        let popupExistente = document.querySelector('.popup');
        let id = Number(this.querySelector('.address-id').textContent);

        if (popupExistente) {
            
            popupExistente.remove();
        } else {

            // Criando o popup
            let popup = document.createElement('div');
            popup.classList.add('popup');

            try{
                
                let endereco = await pegarEnderecoId(id);
                endereco = endereco[0];

                //Mostrando todos os dados
                popup.innerHTML = `
                    <div class="button-popup">
                        <button>X</button>
                    </div>
                    <h2>Dados de ${endereco.end_logradouro}</h2>
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

                containerAddress.appendChild(popup);

            }catch(err){
                console.error(`Erro ao buscar clientes ${err}`);
                return;
            }

            // Evento para fechar o popup ao clicar no botão "X"
            document.querySelector('.button-popup button').addEventListener('click', function(){
                popup.remove();
            });
        }
    });
});






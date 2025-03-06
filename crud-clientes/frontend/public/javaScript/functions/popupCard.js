import { pegarClientesId } from '/javaScript/service/serviceClientes.js';


export function geararPopupClientes(cliente_wrapper, container){
    document.querySelectorAll(cliente_wrapper).forEach(wrapper => {
        wrapper.addEventListener('click', async function(){
    
            let containerIndex = document.querySelector(container);
            let popupExistente = document.querySelector('.popup');
            let id = Number(this.querySelector('p:nth-child(1)').textContent);
    
            if (popupExistente) {
                
                popupExistente.remove();
            } else {
    
                // Criando o popup
                let popup = document.createElement('div');
                popup.classList.add('popup');
    
                try{
                    
                    let cliente = await pegarClientesId(id);
                    cliente = cliente[0];
    
                    //Mostrando todos os dados
                    popup.innerHTML = `
                        <div class="button-popup">
                            <button>X</button>
                        </div>
                        <h2>Dados de ${cliente.clt_nome}</h2>
                        <p><strong>Nome Completo: </strong>${cliente.clt_nome}<p/>
                        <p><strong>E-mail: </strong>${cliente.clt_email}<p/>
                        <p><strong>Telefone: </strong>${cliente.clt_telefone}<p/>
                        <p><strong>CPF: </strong>${cliente.clt_cpf}<p/>
                        <p><strong>Gênero: </strong>${cliente.clt_genero}<p/>
                        <p><strong>Data Nascimento: </strong>${cliente.clt_dataNasc}<p/>
                        <p><strong>Ranking: </strong>${cliente.clt_ranking}<p/>
                    `;
    
                    containerIndex.appendChild(popup);
    
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
}





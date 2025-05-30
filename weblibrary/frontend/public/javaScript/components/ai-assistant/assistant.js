import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";

document.addEventListener('DOMContentLoaded', function(){
    
    //Fazendo com que o botão da IA não fique em cima do footer
    const chatButton = this.querySelector('.chat-button');
    const footer = this.querySelector('footer');
    const chat = this.querySelector('.chat');

    //Verificando se os botões realmente existem
    if(!footer || !chat || !chatButton) return;

    //Função para ajustar a posição do botão da IA
    function ajustarPosicaoBotao(){

        //Obtendo a posição do footer
        const footerRect = footer.getBoundingClientRect();  
        const ft = Number(footerRect.top.toFixed(0));

        if(ft <= (window.innerHeight - 2)){
            chatButton.style.bottom = '70px';
            chat.style.bottom = '76px';
            return;
        }

        chatButton.style.bottom = '5px';
        chat.style.bottom = '11px';
    }

    //Atualizando as posições
    window.addEventListener('scroll', ajustarPosicaoBotao);
    window.addEventListener('resize', ajustarPosicaoBotao);

    //Chamando Todas as funções do documento
    ajustarPosicaoBotao();
    enviarMsg();
    abrirChat();
    removerChatClicarFora();

});

let clienteIdAtual = null;

//Enviando um texto para a IA
async function enviarMsg() {
    let screen = document.querySelector('.screen');
    let button = document.querySelector('#ai-button');
    let input = document.querySelector('.chat .input input');

    //Carregando histórico salvo se existir
    let historico = JSON.parse(localStorage.getItem('chatHistorico')) || [];

    //Verificando se o cliente logado foi alterado
    const cliente = await buscarClienteLogadoService();
    if(clienteIdAtual !== cliente[0].clt_id){
        localStorage.removeItem('chatHistorico');
        clienteIdAtual = cliente[0].clt_id;
    }

    //Renderizando todas as mensagens salvas
    historico.forEach(msg => {
        const p = document.createElement('p');
        p.innerHTML = msg.texto;
        p.style.cssText = msg.estilo;
        screen.appendChild(p);
    });

    screen.scrollTop = screen.scrollHeight;

    //Enviando nova mensagem
    button.addEventListener('click', async (event) => {
        event.preventDefault();

        if (!input.value) {
            alert('Digite algo antes de enviar');
            return;
        }

        const msg = input.value;

        //Cliente
        const p_cliente = document.createElement('p');
        const estilo_cliente = `
            margin: 0 0 30px 20px; 
            border-radius: 20px 0px 0px 20px;
            background-color: #F4F440;
            color: black;
            border: 1px dashed black;
            border-right: none;
        `;
        p_cliente.style.cssText = estilo_cliente;
        p_cliente.innerHTML = msg;
        screen.appendChild(p_cliente);

        historico.push({ texto: msg, estilo: estilo_cliente });

        input.value = '';
        screen.scrollTop = screen.scrollHeight;

        //IA
        const resposta = await obterRespostaIa(msg);
        const p_ia = document.createElement('p');
        const estilo_ia = 'margin: 0px 20px 30px 0;';
        p_ia.style.cssText = estilo_ia;
        p_ia.innerHTML = resposta;
        screen.appendChild(p_ia);

        historico.push({ texto: resposta, estilo: estilo_ia });

        //Salva histórico no localStorage
        localStorage.setItem('chatHistorico', JSON.stringify(historico));

        screen.scrollTop = screen.scrollHeight;
    });
}

//Função que busca a resposta da IA com base em um texto
async function obterRespostaIa(msg){

    try{
        const res = await fetch('http://localhost:8000/ai/',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({msg: msg})
        });

        //Obtendo o msg
        msg = await res.json();
        return msg.ai_res;

    }catch(err){
        console.log(`Erro no assistent.js: ${err}`);
        throw err;
    }
}

//Abrindo o chat da IA
function abrirChat(){
    const chat_button = document.querySelector('.chat-button');
    const chat = document.querySelector('.chat');
    let screen = document.querySelector('.screen');

    //Abrindo o chat
    chat_button.addEventListener('click', () => {

        if(chat_button.classList.contains('selected')){
            chat.style.display = 'none';
            chat_button.classList.toggle('selected');
            return;
        }

        chat.style.display = 'grid';
        chat_button.classList.toggle('selected');

        //Rolando para o final do chat
        screen.scrollTop = screen.scrollHeight;
    });
}

//Removendo a IA ao clicar fora
function removerChatClicarFora(){
    document.addEventListener('click', (event) => {
    
        const chat = document.querySelector('.chat');
        const chatButton = document.querySelector('.chat-button');
    
        if (chat.style.display === 'grid' && 
           !chat.contains(event.target) &&
           !chatButton.contains(event.target)) {
            chat.style.display = 'none';
            chatButton.classList.remove('selected');
        }
    }); 
}





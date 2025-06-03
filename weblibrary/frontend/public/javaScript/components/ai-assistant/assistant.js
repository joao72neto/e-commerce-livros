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
    resetarLocalStorage();

});

//Enviando um texto para a IA
async function enviarMsg() {
    let screen = document.querySelector('.screen');
    let button = document.querySelector('#ai-button');
    let input = document.querySelector('.chat .input input');
    const cliente = await buscarClienteLogadoService();

    //Obtendo o ID atual e todos os outros IDs com chats
    let clt_ids = JSON.parse(localStorage.getItem('clt_ids')) || [];
    let idAtual = String(cliente[0].clt_id);
    let chaveHistorico = `chatHistorico_${idAtual}`;

    //Verificando se o cliente logado foi alterado
    if (!clt_ids.includes(idAtual)) {
        clt_ids.push(idAtual);
        localStorage.setItem('clt_ids', JSON.stringify(clt_ids));
    }

    //Carregando histórico salvo se existir
    let historico = JSON.parse(localStorage.getItem(chaveHistorico)) || [];

    //Renderizando todas as mensagens salvas
    historico.forEach(msg => {
        const p = document.createElement('p');
        p.innerHTML = msg.texto;
        p.style.cssText = msg.estilo;
        screen.appendChild(p);
    });

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
        p_cliente.classList.add('resposta');
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
        let resposta = await obterRespostaIa(msg);
        resposta = marked.parse(resposta);
        const p_ia = document.createElement('p');
        p_ia.classList.add('resposta');
        const estilo_ia = 'margin: 0px 20px 30px 0;';
        p_ia.style.cssText = estilo_ia;
        p_ia.innerHTML = resposta;
        screen.appendChild(p_ia);

        historico.push({ texto: resposta, estilo: estilo_ia });

        //Salva histórico no localStorage com chave do cliente
        localStorage.setItem(chaveHistorico, JSON.stringify(historico));

        screen.scrollTop = screen.scrollHeight;
    });
}

async function resetarLocalStorage(){
    const res = await fetch('/api/version');
    const versaoServidor = await res.text(); 
    const versaoAnterior = localStorage.getItem('server_version');

    if (versaoAnterior && versaoAnterior !== versaoServidor) {

        //Limpando histórico se o servidor reiniciou
        const clt_ids = JSON.parse(localStorage.getItem('clt_ids')) || [];
        clt_ids.forEach(id => {
            localStorage.removeItem(`chatHistorico_${id}`);
        });
        localStorage.setItem('clt_ids', '[]');
    }

    localStorage.setItem('server_version', versaoServidor);
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
async function abrirChat(){
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





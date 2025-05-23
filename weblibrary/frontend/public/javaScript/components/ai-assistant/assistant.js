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

//Enviando um texto para a IA
async function enviarMsg(){

    //Elementos
    let screen = document.querySelector('.screen');
    let button = document.querySelector('#ai-button');

    button.addEventListener('click', async (event) => {

        event.preventDefault();

        //Obtendo o input da IA
        let input = document.querySelector('.chat .input input');
        
        //Criando um parágrafo para exibir o texto do usuário
        const p_cliente = document.createElement('p');
        p_cliente.style.cssText = `
            margin: 0 0 30px 20px; 
            border-radius: 20px 0px 0px 20px;
            background-color: #F4F440;
            color: black;
            border: 1px dashed black;
            border-right: none;
        `;

        //Criando um parágrafo para exibir a resposta da IA
        const p_ia = document.createElement('p');
        p_ia.style.margin = '0px 20px 30px 0;';

        if(input.value){

            //Adicionando o parágrafo
            p_cliente.innerHTML = input.value;
            screen.appendChild(p_cliente);

            //Limpando o input
            const res = await obterRespostaIa();
            input.value = ''

            //Rolando a tela para o fim
            screen.scrollTop = screen.scrollHeight;

            setTimeout(() => {

                //Respondendo o usuário
                p_ia.innerHTML = res;
                screen.appendChild(p_ia);   
                                
                //Rolando a tela para o fim
                screen.scrollTop = screen.scrollHeight;
            }, 600);

            return;
        }

        alert('Digite algo antes de enviar');
    });

}

//Função que busca a resposta da IA com base em um texto
async function obterRespostaIa(){

    try{
        const res = await fetch('http://localhost:8000/ai/',{
            method: 'GET'
        });

        //Obtendo o msg
        msg = await res.json();
        return msg.msg;

    }catch(err){
        console.log(`Erro triste no assistent.js: ${err}`);
        throw err;
    }
}

//Abrindo o chat da IA
function abrirChat(){
    const chat_button = document.querySelector('.chat-button');
    const chat = document.querySelector('.chat');
    chat_button.addEventListener('click', () => {

        if(chat_button.classList.contains('selected')){
            chat.style.display = 'none';
            chat_button.classList.toggle('selected');
            return;
        }

        chat.style.display = 'grid';
        chat_button.classList.toggle('selected');
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





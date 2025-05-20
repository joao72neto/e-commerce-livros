//Ajustando o posicionamento da IA conforme o footer aparece
document.addEventListener('DOMContentLoaded', function(){
    
    //Obtendo os elementos
    const chatButton = this.querySelector('.chat-button');
    const footer = this.querySelector('footer');
    const chat = this.querySelector('.chat');

    //Verificando se os botões realmente existem
    if(!footer || !chat || !chatButton) return;

    //Função para ajustar a posição do botão da IA
    function adjustButtonPosition(){

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

    window.addEventListener('scroll', adjustButtonPosition);
    window.addEventListener('resize', adjustButtonPosition);
    adjustButtonPosition();
});

//Elements
let chat = document.querySelector('.chat');

//Functions
let click_msg = () => {

    //Elements
    let screen = document.querySelector('.screen');
    let button = document.querySelector('#ai-button');

    button.addEventListener('click', (event) => {

        event.preventDefault();

        let input = document.querySelector('.chat .input input');

        if(input.value){

            screen.innerHTML += `<p 
                                    style="margin: 0 0 30px 20px; 
                                    border-radius: 20px 0px 0px 20px;
                                    background-color: #F4F440;
                                    color: black;"
                                >${input.value}</p>`;

            
            //Limpando o input
            const res = input.value
            input.value = ''
            //Rolando a tela para o fim
            screen.scrollTop = screen.scrollHeight;

            setTimeout(() => {
                screen.innerHTML += `<p 
                                    style="margin: 0px 20px 30px 0;"
                                >Parece que você está muito interessado em ${res}</p>`;    
                                
                //Rolando a tela para o fim
                screen.scrollTop = screen.scrollHeight;
            }, 600);
            return;
        }

        alert('Digite algo antes de enviar');
        
    });

}

let click_ia = () => {

    const chat_button = document.querySelector('.chat-button');

    chat_button.addEventListener('click', (event) => {

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

//Calling all the functions
click_msg();
click_ia();




//Elements
let chat = document.querySelector('.chat');
chat.classList.add('fade');

//Functions
let click_msg = () => {

    //Elements
    let screen = document.querySelector('.screen');
    let button = document.querySelector('#ai-button');

    button.addEventListener('click', () => {

        let input = document.querySelector('.chat .input input').value;

        if(input){

            screen.innerHTML += `<p 
                                    style="margin: 0 0 0 20px; 
                                    border-radius: 20px 0px 0px 20px;
                                    background-color: #F4F440;
                                    color: black;"
                                >${input}</p>`;

            screen.innerHTML += `<p 
                                    style="margin: 30px 20px 30px 0;"
                                >Parece que você está muito interessado em ${input}</p>`;
            return;
        }

        alert('Digite algo antes de enviar');
        
    });

}

let click_ia = () => {

    let chat_button = document.querySelector('.chat-button');
    chat_button.addEventListener('click', () => {

        if(chat_button.classList.contains('selected')){
            chat.style.display = 'none';
            chat_button.classList.toggle('selected');
            return;
        }

        chat.style.display = 'flex';
        chat_button.classList.toggle('selected');
    });
}

//Removendo a IA ao clicar fora
document.addEventListener('click', (event) => {
    const chat = document.querySelector('.chat');
    const chatButton = document.querySelector('.chat-button');
    
    if (chat.style.display === 'flex' && 
       !chat.contains(event.target) &&
       !chatButton.contains(event.target)) {
        chat.style.display = 'none';
        chatButton.classList.remove('selected');
    }
});



//Calling all the functions
click_msg();
click_ia();




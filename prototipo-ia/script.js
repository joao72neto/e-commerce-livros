//Elements
let button = document.querySelector('button');
let chat = document.querySelector('.chat');
let chat_button = document.querySelector('.chat-button');
let screen = document.querySelector('.screen');

chat.classList.add('fade');

//Functions
let click_msg = () => {

    button.addEventListener('click', () => {

        let input = document.querySelector('input').value;

        if(input){

            screen.innerHTML += `<p 
                                    style="margin: 0 0 0 20px; 
                                    border-radius: 20px 0px 0px 20px;"
                                >${input}</p>`;

            screen.innerHTML += `<p 
                                    style="margin: 30px 0px;"
                                >Parece que você está muito interessado em ${input}</p>`;
            return;
        }

        alert('Digite algo antes de enviar');
        
    });

}

let click_ia = () => {
    chat_button.addEventListener('click', () => {

        let chat_button_span = document.querySelector('.chat-button span');
        
        chat_button.classList.toggle('selected');

        if(chat.classList.length == 1){
            chat.classList.add('fade');
            return;

        }

        if(chat.classList.contains('fade')){
            chat.classList.remove('fade');
            chat.classList.add('show');
            return;
        }

        chat.classList.remove('show');
        chat.classList.add('fade');

    });
}


//Calling all the functions
click_msg();
click_ia();




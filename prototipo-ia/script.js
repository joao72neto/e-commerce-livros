//Elements
let button = document.querySelector('button');
let screen = document.querySelector('.screen');
let chat_button = document.querySelector('.chat-button');

//Functions
let click_msg = () => {

    button.addEventListener('click', () => {

        let input = document.querySelector('input').value;

        if(input){

            screen.innerHTML += `<p 
                                    style="margin: 30px 0px 0px 20px; 
                                    border-radius: 20px 0px 0px 20px;"
                                >${input}</p>`;

            screen.innerHTML += `<p 
                                    style="margin-top: 30px;"
                                >Parece que você está muito interessado em ${input}</p>`;
            return;
        }

        alert('Digite algo antes de enviar');
        
    });

}

let click_ia = () => {
    chat_button.addEventListener('click', () => {
        let chat = document.querySelector('.chat');

        if(!chat.classList.contains('show')){
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




//Elements
let chat = document.querySelector('.chat');
chat.classList.add('fade');

//Functions
let click_msg = () => {

    //Elements
    let screen = document.querySelector('.screen');
    let button = document.querySelector('button');

    button.addEventListener('click', () => {

        let input = document.querySelector('input').value;

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




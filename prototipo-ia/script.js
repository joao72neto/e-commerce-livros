let button = document.querySelector('button');
let screen = document.querySelector('.screen');

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






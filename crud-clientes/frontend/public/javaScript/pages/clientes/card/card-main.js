//Pegando o ID do cartao ao clicar
document.querySelectorAll('.alt').forEach(button => {
    
    button.addEventListener('click', function(){
        const enderecoWrapper = this.closest('.card-wrapper');
        const id = enderecoWrapper.querySelector('.card-id').textContent;

        const path = window.location.pathname + `/alt/${id}`;

        console.log(path);

        window.location.href = path;
    });
});
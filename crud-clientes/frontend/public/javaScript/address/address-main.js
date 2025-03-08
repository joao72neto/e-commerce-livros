//Pegando o ID do endereco ao clicar
document.querySelectorAll('.alt').forEach(button => {
    
    button.addEventListener('click', function(){
        const enderecoWrapper = this.closest('.endereco-wrapper');
        const id = enderecoWrapper.querySelector('.address-id').textContent;

        const path = window.location.pathname + `/alt/${id}`;

        window.location.href = path;

    });
});
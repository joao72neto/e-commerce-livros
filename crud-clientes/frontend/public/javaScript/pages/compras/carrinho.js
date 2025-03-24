//Aumentado a quatidado do item
document.querySelectorAll('.aumentar').forEach(button => {
    button.addEventListener('click', function(){
        const wrapper = this.closest('.wrapper');
        const contador = wrapper.querySelector('#contador');

        contador.textContent = Number(contador.textContent) + 1;
    });
});



//Diminuindo a quantidade do item
document.querySelectorAll('.diminuir').forEach(button => {
    button.addEventListener('click', function(){
        const wrapper = this.closest('.wrapper');
        const contador = wrapper.querySelector('#contador');

        if(Number(contador.textContent) > 0){
            contador.textContent = Number(contador.textContent) - 1;
        }
    });
});



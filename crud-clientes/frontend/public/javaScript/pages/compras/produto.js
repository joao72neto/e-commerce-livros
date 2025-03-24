//Aumentado a quatidado do item
document.querySelector('.aumentar').addEventListener('click', function(){
    const contador = document.querySelector('#contador');
    contador.textContent = Number(contador.textContent) + 1;
});


//Diminuindo a quantidade do item
document.querySelector('.diminuir').addEventListener('click', function(){

    const contador = document.querySelector('#contador');
    if(Number(contador.textContent) > 0){
        contador.textContent = Number(contador.textContent) - 1;
    }
});





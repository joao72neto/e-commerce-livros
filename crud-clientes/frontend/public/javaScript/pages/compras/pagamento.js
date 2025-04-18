//Adicionando cupons que o cliente possui
document.querySelector('.add-cupom').addEventListener('click', function(){
    
    //Pegando o cupom que o usuário escolheu
    const select = document.querySelector('#cupons').value;
    console.log(select);

    //Aplicando o cupom escolhido pelo usuário
    const cuponsAplicados = document.querySelector('.cupons-aplicados');
    cuponsAplicados.innerHTML += `
        <p>-R$${String(select).replace('.', ',')}</p>
    `;
    
});
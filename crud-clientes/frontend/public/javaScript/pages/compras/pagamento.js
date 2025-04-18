import { deletarCupomIdService } from "/javaScript/service/compras/servicePagamento.js";

//Adicionando cupons que o cliente possui
document.querySelector('.add-cupom').addEventListener('click', async function(){
    
    //Pegando o cupom que o usuário escolheu
    const select = document.querySelector('#cupons');
    const cup_valor = select.value;
    const cup_id = select.selectedOptions[0].getAttribute('data-cup-id');

    console.log(cup_id);

    //Aplicando o cupom escolhido pelo usuário
    const cuponsAplicados = document.querySelector('.cupons-aplicados');
    cuponsAplicados.innerHTML += `
        <p>-R$${String(cup_valor).replace('.', ',')}</p>
    `;

    //Atualizando o total ao aplicar o cupom
    let total = Number(document.querySelector('.total').textContent.split('R$')[1].replace(',', '.'));
    
    total -= Number(cup_valor);

    document.querySelector('.total').textContent = `Total: R$${String(total.toFixed(2)).replace('.', ',')}`

    //Removendo o cupom do banco de dados
    const res = await deletarCupomIdService(cup_id);

    if(res.status === 204){
        window.location.reload();
        return;
    }

    alert('Não foi possível aplicar o cupom');
    
});
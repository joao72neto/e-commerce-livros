import { cadastrarCardService } from "/javaScript/service/clientes/serviceCard.js";
import { validarCard } from "/javaScript/validations/clientes/validacoesCard.js";

//Enviando os dados para o backend
document.querySelector('form').addEventListener('submit', async function(event){
    
    //Validando os dados do cartão
    if(!validarCard(event)){
        return;
    }

    event.preventDefault();

    //Pegando os dados do forms
    const formDados = new FormData(event.target);
    let dados = Object.fromEntries(formDados.entries());

    //Pegando o id do cliente e do cartão
    const clt_id = window.location.pathname.split('/')[3];

    const card = {
        car_clt_id: clt_id,
        car_numero: dados.numero_cartao,
        car_nome: dados.nome_cartao,
        car_bandeira: dados.bandeira_cartao,
        car_cvv: dados.codigo_seguranca,
    }

  
    //Passando os dados para o back
    let result = await cadastrarCardService(card, clt_id);
    
    if(result.status === 200){
        alert('Cartão foi cadastrado com sucesso!');
        window.location.href = `/clientes/card/${clt_id}`;
        return;
    }

    alert('Não foi possível cadastrar o cartão');

});

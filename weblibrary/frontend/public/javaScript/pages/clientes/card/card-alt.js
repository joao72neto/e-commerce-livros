import { atualizarCardService } from "/javaScript/service/clientes/serviceCard.js";
import { validarCard } from "/javaScript/validations/clientes/validacoesCard.js";

//Enviando os dados para o backend
document.querySelector('form').addEventListener('submit', async function(event){
    
    //Validando os dados do cartão
    if(!validarCard(event)){
        return;
    }

    event.preventDefault();

    const formDados = new FormData(event.target);
    let dados = Object.fromEntries(formDados.entries());

    //Pegando o id do cliente e do cartão
    const clt_id = window.location.pathname.split('/')[3];
    const car_id = window.location.pathname.split('/').splice(-1)[0];

    const card = {
        car_numero: dados.numero_cartao,
        car_nome: dados.nome_cartao,
        car_bandeira: dados.bandeira_cartao,
        car_cvv: dados.codigo_seguranca
    }

    let user = {
        user_type: '(Admin) ',
        clt_id: clt_id
    }
  
    //Getting URL params
    const params = new URLSearchParams(window.location.search);
    if(params.get('retorno')){
        user.user_type = '';
    }

    //Passando os dados para o back
    let result = await atualizarCardService(card, user, clt_id, car_id);
    
    if(result.status === 200){
        alert('Cartão foi atualizado com sucesso!');

        //Redirecionando o usuário
        const urlParams = new URLSearchParams(window.location.search);
        const retorno = urlParams.get('retorno');
        const retorno_pag = urlParams.get('retorno_pag');
        const compra = urlParams.get('compra');
        const page = urlParams.get('page');
        const tipo = urlParams.get('tipo');

        //Definindo o retorno
        let retorno_atual =  '';

        if(retorno_pag && retorno && page){
            retorno_atual = `/perfil?retorno_pag=${retorno_pag}&tipo=${tipo}&page=${page}`;

        }else if(retorno_pag && retorno && compra){
            retorno_atual = `/perfil?retorno_pag=${retorno_pag}&tipo=${tipo}&compra=${compra}`;

        }else{
            retorno_atual = `/clientes/address/${clt_id}`;
        }

        window.location.href = retorno_atual;
        return;
    }

    alert('Não foi possível atualizar o cartão');

});

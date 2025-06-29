import { validarAddress } from "/javaScript/validations/clientes/validacoesAddress.js";
import { mascarasAddress } from "/javaScript/validations/clientes/validacoesAddress.js";
import { cadastrarAddressService } from "/javaScript/service/clientes/serviceAddress.js";

//Mascaras para o endereço
mascarasAddress();

//Enviando os dados para o backend
document.querySelector('form').addEventListener('submit', async function(event){
    
    //Validando os dados do endereço
    if(!validarAddress(event)){
        return;
    }
    
    event.preventDefault();

    //Pegando os dados do forms
    const formDados = new FormData(event.target);
    let dados = Object.fromEntries(formDados.entries());

    //Getting selects
    const residencia = document.querySelector('#residencia').value;
    const entrega = document.querySelector('#entrega').value;
    const cobranca = document.querySelector('#cobranca').value;

    //Pegando o id do cliente
    const clt_id = window.location.pathname.split('/')[3];

    const address = {
        end_clt_id: clt_id,
        end_nome: dados.logradouro,
        end_bairro: dados.bairro,
        end_cep: dados.cep,
        end_cidade: dados.cidade,
        end_estado: dados.estado,
        end_logradouro: dados.logradouro,
        end_numero: dados.numero,
        end_pais: dados.pais,
        end_tipoLogradouro: dados.tipo_logradouro,
        end_tipoResidencia: dados.tipo_residencia,
        end_cobranca: cobranca,
        end_residencia: residencia,
        end_entrega: entrega
    }

    let user = {
        user_type: '(Admin) '
    }

    //Getting URL params
    const params = new URLSearchParams(window.location.search);
    if(params.get('retorno')){
        user.user_type = ''
    }

    //Passando os dados para o back
    let result = await cadastrarAddressService(address, user, clt_id);
    
    if(result.status === 200){
        alert('Endereço foi cadastrado com sucesso!');

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

    alert('Não foi possível cadastrar o endereço');

});

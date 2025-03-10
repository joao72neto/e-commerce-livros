import { cadastrarAddressService } from "/javaScript/service/serviceAddress.js";

//Enviando os dados para o backend
document.querySelector('form').addEventListener('submit', async function(event){
    event.preventDefault();

    //Pegando os dados do forms
    const formDados = new FormData(event.target);
    let dados = Object.fromEntries(formDados.entries());


    //Pegando o id do cliente
    const clt_id = window.location.pathname.split('/')[2];


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
        end_tipoResidencia: dados.tipo_residencia
    }

    //Passando os dados para o back
    let result = await cadastrarAddressService(address, clt_id);
    
    if(result.status === 200){
        alert('Endereço foi cadastrado com sucessor!');
        return;
    }

    alert('Não foi possível cadastrar o endereço');

});

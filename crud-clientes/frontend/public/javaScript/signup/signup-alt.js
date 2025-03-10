import { signupAltService } from "/javaScript/service/serviceSignup.js";

//PASSANDO OS DADOS PARA CADASTRO
document.querySelector('form').addEventListener('submit', async function (event) {
    
    event.preventDefault();
   
    //Pegando dados do formulário
    const formDados = new FormData(event.target);
    let dados = Object.fromEntries(formDados.entries());

    //Pegando o ID do cliente
    const clt_id = window.location.pathname.split('/').splice(-1)[0];

    //Preparando os dados para passar para o back
    const cliente = {
        clt_nome: dados.nome,
        clt_genero: dados.gen,
        clt_dataNasc: dados.data, 
        clt_cpf: dados.cpf, 
        clt_telefone: dados.telefone,
        clt_email: dados.email,
        clt_senha: dados.senha     
    };

    const address = {
        end_id: dados.end_id,
        end_nome: dados.logradouro,
        end_tipoResidencia: dados.tipo_residencia,
        end_tipoLogradouro: dados.tipo_logradouro,
        end_logradouro: dados.logradouro,
        end_numero: dados.numero,
        end_bairro: dados.bairro,
        end_cep: dados.cep,
        end_cidade: dados.cidade,
        end_estado: dados.estado,
        end_pais: dados.pais

    }

    const card = {
        car_id: dados.car_id,
        car_nome: dados.nome_cartao,
        car_numero: dados.numero_cartao,
        car_bandeira: dados.bandeira_cartao,
        car_cvv: dados.codigo_seguranca
    }

    const signupDados = {cliente, address, card}

    console.log(signupDados);

    const status = await signupAltService(signupDados, clt_id);

    if(status === 200){
        alert('Cliente foi atualizado com sucesso!');
        return;
    }

    alert('Não foi posível atualizar o cliente');

});


import { validarSignupAlt } from "/javaScript/validations/clientes/signup/validacoesSignupAlt.js";
import { signupAltService } from "/javaScript/service/clientes/serviceSignup.js";
import { mascarasSignupAlt } from "/javaScript/validations/clientes/signup/validacoesSignupAlt.js";


//Mascaras para o cadastro de cliente
mascarasSignupAlt();

//PASSANDO OS DADOS PARA CADASTRO
document.querySelector('form').addEventListener('submit', async function (event) {
    
    //Validando os dados antes de mandá-los para o back
    if(!validarSignupAlt(event)){
        return;
    }

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
        clt_email: dados.email   
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

    let user = {
        user_type: '(Admin) ',
    }

    //Getting params
    const params = new URLSearchParams(window.location.search);
    const page = params.get('retorno');
    if(page === 'perfil'){
        user.user_type = '';
    }

    const signupDados = {cliente, address, card, user}

    const res = await signupAltService(signupDados, clt_id);

    if(res.status === 200){
        alert('Cliente foi atualizado com sucesso!');

        const urlParams = new URLSearchParams(window.location.search);
        const retorno = urlParams.get('retorno'); 

        window.location.href = `/${retorno}`;
        return;
    }

    alert(res.erros.erros[0].msg);

});


import { validarSignup } from "/javaScript/validations/clientes/signup/validacoesSignup.js";
import { signupService } from "/javaScript/service/clientes/serviceSignup.js";
import { mascarasSignup } from "/javaScript/validations/clientes/signup/validacoesSignup.js";


//Mascaras para o cadastro de cliente
mascarasSignup();

//FUNÇÃO QUE ENVIA OS DADOS PARA O BACKEND
document.querySelector('form').addEventListener('submit', async function(event){

    //Validando os dados antes de enviá-los para o back
    if(!validarSignup(event)){
        return;
    }
    
    event.preventDefault();

    //Pegando dados do formulário
    const formDados = new FormData(event.target);
    let dados = Object.fromEntries(formDados.entries());

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
        car_nome: dados.nome_cartao,
        car_numero: dados.numero_cartao,
        car_bandeira: dados.bandeira_cartao,
        car_cvv: dados.codigo_seguranca
    }

    const signupDados = {cliente, address, card};

    const res = await signupService(signupDados);

    if(res.status === 200){
        alert('Cliente foi Cadastrado com Sucesso!');
        window.location.href = '/clientes';
        return;
    }

    alert(res.erros.erros[0].msg);
   
});


import { signupService } from "/javaScript/service/serviceSignup.js";


//FUNÇÃO QUE ENVIA OS DADOS PARA O BACKEND
async function submit(event){
 
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

    const signupDados = {cliente, address, card}

    const status = await signupService(signupDados);

    if(status === 200){
        alert('Cliente foi Cadastrado com Sucesso!');
        return;
    }

    alert('Não foi posível cadastrar o cliente');
    
}

//VALIDANDO OS DADOS DO FORMULÁRIO
document.querySelector('form').addEventListener('submit', function(event) {
    
    event.preventDefault();
    
    let isValid = true; 
    const form = event.target;

    // Validando o cep (formato brasileiro)
    const cep = form.querySelector('#cep').value;
    const cepPattern = /^\d{5}-\d{3}$/; 
    if (!cepPattern.test(cep)) {
        alert('O CEP deve estar no formato XXXXX-XXX');
        isValid = false;
    }

    //Impedindo o envio do formulário caso haja erro
    if (isValid) {
        submit(event);
    }
});




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

//MASCARAS

//Telefone
const telefone = document.querySelector('#telefone');

if (telefone) {
    Inputmask("+99 (99) 99999-9999").mask(telefone);
}

//CPF
const cpf = document.querySelector('#cpf');

if (cpf) {
    Inputmask("999.999.999-99").mask(cpf);
}

//CEP
const cep = document.querySelector('#cep');

if(cep){
    Inputmask("99999-999").mask(cep);
}


//VALIDAÇÕES
document.querySelector('form').addEventListener('submit', function(event) {
    
    event.preventDefault();
    const form = event.target;

    //Validando telefone (+XX (XX) XXXXX-XXXX)
    const telefone = form.querySelector('#telefone').value;
    const telPattern = /^\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}$/;
    if(!telPattern.test(telefone)){
        alert('Telefone deve esta no formato +XX (XX) XXXXX-XXXX');
        return;
    }


    //Vaalidando o CPF
    const cpf = form.querySelector('#cpf').value;
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if(!cpfPattern.test(cpf)){
        alert('O CPF deve estar no formato XXX.XXX.XXX-XX');
        return;
    }

    //Validando a senha
    const senha = form.querySelector('#senha').value;
    const senhaRep = form.querySelector('#confirma_senha').value

    const requisitos = [
        { regex: /[a-z]/, mensagem: "A senha deve conter pelo menos uma letra minúscula." },
        { regex: /[A-Z]/, mensagem: "A senha deve conter pelo menos uma letra maiúscula." },
        { regex: /[\W_]/, mensagem: "A senha deve conter pelo menos um caractere especial." },
        { regex: /.{8,}/, mensagem: "A senha deve ter pelo menos 8 caracteres." }
    ];

    const erros = requisitos
        .filter(req => !req.regex.test(senha))
        .map(req => req.mensagem);
    
    if(senhaRep !== senha){
        alert('A senha não bate com a sua repetiçao');
        return;
    }

    if(erros.length > 0){
        alert(erros.join('\n'));
        return;
    }

    
    // Validando o cep (XXXXX-XXX)
    const cep = form.querySelector('#cep').value;
    const cepPattern = /^\d{5}-\d{3}$/; 
    if (!cepPattern.test(cep)) {
        alert('O CEP deve estar no formato XXXXX-XXX');
        return;
    }

    //Submentendo caso todas as validações tenham passado
    submit(event);
  
});




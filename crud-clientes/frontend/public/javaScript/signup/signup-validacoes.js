//Mascaras para o cadastro de cliente
export function mascarasSignup(){

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

    //Estado
    const estado = document.querySelector('#estado');
    if(estado){
        Inputmask("AA").mask(estado);
    }
}

//Função que valida os dados de cadastro de cliente
export function validarSignup(event){
    
    //VALIDAÇÕES
    event.preventDefault();
    const form = event.target;
    let ok = true;

    //Validando telefone (+XX (XX) XXXXX-XXXX)
    const telefone = form.querySelector('#telefone').value;
    const telPattern = /^\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}$/;
    if(!telPattern.test(telefone)){
        alert('Telefone deve esta no formato +XX (XX) XXXXX-XXXX');
        ok = false;
        return ok;
    }


    //Validando o CPF
    const cpf = form.querySelector('#cpf').value;
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if(!cpfPattern.test(cpf)){
        alert('O CPF deve estar no formato XXX.XXX.XXX-XX');
        ok = false;
        return ok;
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
        ok = false;
        return ok;
    }

    if(erros.length > 0){
        alert(erros.join('\n'));
        ok = false;
        return ok;
    }


    // Validando o cep (XXXXX-XXX)
    const cep = form.querySelector('#cep').value;
    const cepPattern = /^\d{5}-\d{3}$/; 
    if (!cepPattern.test(cep)) {
        alert('O CEP deve estar no formato XXXXX-XXX');
        ok = false;
        return ok;
    }

    //Validando estado
    const arrayEstados = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
        "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
        "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    const estado = form.querySelector('#estado').value.toUpperCase(); 

    if (!/^[A-Za-z]{2}$/.test(estado) || !arrayEstados.includes(estado)) {
        alert('Estado inválido! Use o formato correto (ex: SP, RJ, MG).');
        ok = false;
        return ok;
    }


    //Validação do número do cartão
    const cardNumber = form.querySelector('#numero_cartao').value;

    const cardPattern = /^\d{13,19}$/;

    if (!cardPattern.test(cardNumber)) {
        alert('Número de cartão inválido! Verifique se contém apenas números e tem entre 13 e 19 dígitos.');
        ok = false;   
        return ok;     
    }

    //Validação do CVV
    const cvv = form.querySelector('#codigo_seguranca').value;

    const cvvPattern = /^\d{3,4}$/;

    if (!cvvPattern.test(cvv)) {
        alert('CVV inválido! Deve conter 3 ou 4 números.');
        ok = false;
        return ok;
    }

    return ok;
}






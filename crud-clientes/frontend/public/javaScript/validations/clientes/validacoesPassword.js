//Função que valida a senha na hora do cadastro
export function validarPassword(event){
    
    //Validação da senha
    event.preventDefault();
    const form = event.target;
    let ok = true;

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

    return ok;
}






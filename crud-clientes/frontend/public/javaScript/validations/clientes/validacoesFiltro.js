//Mascaras para o cadastro de cliente
export function mascarasFiltro(){

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
}


//Função que valida os dados de filtro de clientes
export function validarFiltro(event, form){
    
    //VALIDAÇÕES
    event.preventDefault();
    let ok = true;

    //Pattern que aceita apenas letras e espaços
    const textoApenas = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/;


    //Validando o nome do usuário
    const nome = form.querySelector('#nome').value;
    if(nome && !textoApenas.test(nome)){
        alert('O campo "Nome" não pode conter valores numéricos');
        ok = false;
        return ok;
    }

    //Validando telefone (+XX (XX) XXXXX-XXXX)
    const telefone = form.querySelector('#telefone').value;
    const telPattern = /^\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}$/;
    if(telefone && !telPattern.test(telefone)){
        alert('Telefone deve esta no formato +XX (XX) XXXXX-XXXX');
        ok = false;
        return ok;
    }


    //Validando o CPF
    const cpf = form.querySelector('#cpf').value;
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if(cpf && !cpfPattern.test(cpf)){
        alert('O CPF deve estar no formato XXX.XXX.XXX-XX');
        ok = false;
        return ok;
    }
    
    return ok;
}






import { validarCard } from "/javaScript/validations/clientes/validacoesCard.js";
import { validarAddress } from "/javaScript/validations/clientes/validacoesAddress.js";
import { mascarasAddress } from "/javaScript/validations/clientes/validacoesAddress.js";
import { validarPassword } from "/javaScript/validations/clientes/validacoesPassword.js";


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

    //Mascara do endereço
    mascarasAddress();
}

//Função que valida os dados de cadastro de cliente
export function validarSignup(event){
    
    //VALIDAÇÕES
    event.preventDefault();
    const form = event.target;
    let ok = true;

    //Pattern que aceita apenas letras e espaços
    const textoApenas = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/;


    //Validando o nome do usuário
    const nome = form.querySelector('#nome').value;
    if(!textoApenas.test(nome)){
        alert('O campo "Nome" não pode conter valores numéricos');
        ok = false;
        return ok;
    }

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
    if(!validarPassword(event)){
        ok = false;
        return ok;
    }
    

    //Validando o endereço
    if(!validarAddress(event)){
        ok = false;
        return ok;
    }

    
    //Validando o cartão
    if(!validarCard(event)){
        ok = false;
        return ok;
    }
    
    return ok;
}






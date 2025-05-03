
//Função que valida os dados de cadastro de cliente
export function validarCard(event){
    
    //VALIDAÇÕES
    event.preventDefault();
    const form = event.target;
    let ok = true;

    //Pattern que aceita apenas letras e espaços
    const textoApenas = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/;


    //Validação do número do cartão
    const cardNumber = form.querySelector('#numero_cartao').value;
    const cardPattern = /^\d{13,19}$/;

    if (!cardPattern.test(cardNumber)) {
        alert('Número de cartão inválido! Verifique se contém apenas números e tem entre 13 e 19 dígitos.');
        ok = false;   
        return ok;     
    }

    //Validando o nome impresso no cartão
    const nomeCartao = form.querySelector('#nome_cartao').value;
    if(!textoApenas.test(nomeCartao)){
        alert('O campo "Nome Impresso no Cartão" não pode conter valores numéricos');
        ok = false;
        return ok;
    }

    //Validando a baneira do cartão
    const bandeira = form.querySelector('#bandeira_cartao').value;
    if(!textoApenas.test(bandeira)){
        alert('O campo "Bandeira do Cartão" não pode conter valores numéricos');
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






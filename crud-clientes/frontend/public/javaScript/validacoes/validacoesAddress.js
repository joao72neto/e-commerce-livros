//Mascaras para o cadastro de cliente
export function mascarasAddress(){

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
export function validarAddress(event){
    
    //VALIDAÇÕES
    event.preventDefault();
    const form = event.target;
    let ok = true;

    //Pattern que aceita apenas letras e espaços
    const textoApenas = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/;


    //Validando o tipo de residência
    const tipoResidencia = form.querySelector('#tipo_residencia').value;
    if(!textoApenas.test(tipoResidencia)){
        alert('O campo "Tipo de Residência" não pode conter valores numéricos');
        ok = false;
        return ok;
    }

    //Validando o tipo de logradouro
    const tipoLogradouro = form.querySelector('#tipo_logradouro').value;
    if(!textoApenas.test(tipoLogradouro)){
        alert('O campo "Tipo de Logradouro" não pode conter valores numéricos');
        ok = false;
        return ok;
    }

    //Validando o logradouro
    const logradouro = form.querySelector('#logradouro').value;
    if(!textoApenas.test(logradouro)){
        alert('O campo "Logradouro" não pode conter valores numéricos');
        ok = false;
        return ok;
    }

    //Validando o bairro
    const bairro = form.querySelector('#bairro').value;
    if(!textoApenas.test(bairro)){
        alert('O campo "Bairro" não pode conter valores numéricos');
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

    //Validando a cidade
    const cidade = form.querySelector('#cidade').value;
    if(!textoApenas.test(cidade)){
        alert('O campo "Cidade" não pode conter valores numéricos');
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

    //Validando o País
    const pais = form.querySelector('#pais').value;
    if(!textoApenas.test(pais)){
        alert('O campo "País" não pode conter valores numéricos');
        ok = false;
        return ok;
    }

    return ok;
}






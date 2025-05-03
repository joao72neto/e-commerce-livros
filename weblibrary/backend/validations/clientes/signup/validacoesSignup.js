const {body, validationResult} = require('express-validator');

const textoApenas = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/;
const generos = ['M', 'F', 'O'];
const arrayEstados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

//Validações da página de cadastro de clientes
module.exports.validarSignup = [

    //Validando os dados pessoais do cliente
    body('cliente.clt_nome')
        .matches(textoApenas)
        .withMessage('O campo (clt_nome) não pode conter valores numéricos'),

    body('cliente.clt_genero')
        .custom(value => {

            if(!generos.includes(value)){
                throw new Error('Gênero inválido')
            }

            return true;
        })
        .withMessage('O campo (clt_genero) precisa estar no formato X'),

    body('cliente.clt_dataNasc')
        .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
        .withMessage('O campo (clt_dataNasc) precisa estar no formato YYYY-MM-DD'),

    body('cliente.clt_cpf')
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .withMessage('O campo (clt_cpf) precisa estar no formato XXX.XXX.XXX-XX'),
    

    body('cliente.clt_telefone')
        .isMobilePhone('pt-BR', {strictMode: true})
        .withMessage('O campo (clt_telefone) precisa estar no formato brasileiro'),

    body('cliente.clt_email')
        .isEmail()
        .withMessage('O campo (clt_email) precisa ter um formato válido de e-mail'),


    //Validando a senha do usuário
    body('cliente.clt_senha')
        .isLength({min: 8}).withMessage('A senha deve ter pelo menos 8 caracteres')
        .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula')
        .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula')
        .matches(/[\W_]/).withMessage('A senha deve conter pelo menos um caractere especial')
        .matches(/[0-9]/).withMessage('A senha deve conter pelo menos um número'),


    //Validando o endereço so usuário
    body('address.end_nome')
            .matches(textoApenas)
            .withMessage('O campo (end_nome) não pode conter valores numéricos'),
    
    body('address.end_tipoResidencia')
        .matches(textoApenas)
        .withMessage('O campo (end_tipoResidencia) não pode conter valores numéricos'),

    body('address.end_tipoLogradouro')
        .matches(textoApenas)
        .withMessage('O campo (end_tipoLogradouro) não pode conter valores numéricos'),

    body('address.end_logradouro')
        .matches(textoApenas)
        .withMessage('O campo (end_logradouro) não pode conter valores numéricos'),

    body('address.end_numero')
        .isNumeric()
        .withMessage('O campo (end_numero) precisa conter valores numéricos'),

    body('address.end_bairro')
        .matches(textoApenas)
        .withMessage('O campo (end_bairro) não pode conter valores numéricos'),

    body('address.end_cep')
        .matches(/^\d{5}-\d{3}$/)
        .withMessage('O campo (end_cep) precisa estar no formato XXXXX-XXX'),

    body('address.end_cidade')
        .matches(textoApenas)
        .withMessage('O campo (end_cidade) não pode conter valores numéricos'),

    body('address.end_estado')
        .custom(value => {

            if(!arrayEstados.includes(value)){
                throw new Error('O estado informado não é válido');
            }

            return true;

        })
        .withMessage('O estado deve ser válido e pertencente ao Brasil'),

    body('address.end_pais')
        .matches(textoApenas)
        .withMessage('O campo (end_pais) não pode conter valores numéricos'),


    //Validando o cartão do usuário
    body('card.car_nome')
        .matches(textoApenas)
        .withMessage('O campo (car_nome) não pode conter valores numéricos'),
    
    body('card.car_numero')
        .isNumeric()
        .withMessage('O campo (car_numero) precisa ter apenas valores numéricos')
        .isLength({min: 13, max: 19})
        .withMessage('O campo (car_numero) precisa ter de 13 a 19 dígitos'),

    body('card.car_bandeira')
        .matches(textoApenas)
        .withMessage('O campo(car_bandeira) não pode conter valores numéricos'),

    body('card.car_cvv')
        .isNumeric()
        .withMessage('O campo (car_cvv) precisa ter apenas valores numéricos')
        .isLength({min: 3, max: 4})
        .withMessage('O campo (car_cvv) deve conter de 3 a 4 dígitos'),


    //Retornado o resultado da validação
    (req, res, next) => {
        const erros = validationResult(req);

        if(!erros.isEmpty()){
            res.status(400).json({erros: erros.array()});
            console.log(erros.array());
            return;
        }

        next();
    }
];

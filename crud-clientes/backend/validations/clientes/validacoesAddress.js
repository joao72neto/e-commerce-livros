const {body, validationResult} = require('express-validator');

//Validações para cadastro e atualização de endereços
const textoApenas = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/;

const arrayEstados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

module.exports.validarAddress = [

    body('end_nome')
        .matches(textoApenas)
        .withMessage('O compo (end_nome) não pode conter valores numéricos'),

    body('end_tipoResidencia')
        .matches(textoApenas)
        .withMessage('O campo (end_tipoResidencia) não pode conter valores numéricos'),

    body('end_tipoLogradouro')
        .matches(textoApenas)
        .withMessage('O campo (end_tipoLogradouro) não pode conter valores numéricos'),

    body('end_logradouro')
        .matches(textoApenas)
        .withMessage('O campo (end_logradouro) não pode conter valores numéricos'),

    body('end_numero')
        .isNumeric()
        .withMessage('O campo (end_numero) precisa conter valores numéricos'),

    body('end_bairro')
        .matches(textoApenas)
        .withMessage('O campo (end_bairro) não pode conter valores numéricos'),

    body('end_cep')
        .matches(/^\d{5}-\d{3}$/)
        .withMessage('O campo (end_cep) precisa estar no formato XXXXX-XXX'),

    body('end_cidade')
        .matches(textoApenas)
        .withMessage('O campo (end_cidade) não pode conter valores numéricos'),

    body('end_estado')
        .custom(value => {

            if(!arrayEstados.includes(value)){
                throw new Error('O estado informado não é válido');
            }

            return true;

        })
        .withMessage('O estado deve ser válido e pertencente ao Brasil'),

    body('end_pais')
        .matches(textoApenas)
        .withMessage('O campo (end_pais) não pode conter valores numéricos'),

    (req, res, next) => {
        const erros = validationResult(req);
        
        if(!erros.isEmpty()){
            res.status(400).json({erros: erros.array()});
            console.log(erros.array());
            return;
        }

        next();
    }
]

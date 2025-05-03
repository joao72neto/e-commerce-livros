const {query, validationResult} = require('express-validator');

const textoApenas = /^[A-Za-zÀ-ÖØ-öø-ÿ\s.]+$/;
const generos = ['M', 'F', 'O'];

module.exports.validarFiltro = [

    //Validando os dados do filtro
    query('clt_nome')
        .optional()
        .matches(textoApenas)
        .withMessage('O campo (clt_nome) não pode conter valores numéricos'),

    query('clt_genero')
        .optional()
        .custom(value => {

            if(!generos.includes(value)){
                throw new Error('Gênero inválido')
            }

            return true;
        })
        .withMessage('O campo (clt_genero) precisa estar no formato X'),

    query('clt_dataNasc')
        .optional()
        .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
        .withMessage('O campo (clt_dataNasc) precisa estar no formato YYYY-MM-DD'),

    query('clt_cpf')
        .optional()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .withMessage('O campo (clt_cpf) precisa estar no formato XXX.XXX.XXX-XX'),
    

    query('clt_telefone')
        .optional()
        .isMobilePhone('pt-BR', {strictMode: true})
        .withMessage('O campo (clt_telefone) precisa estar no formato brasileiro'),

    query('clt_email')
        .optional()
        .isEmail()
        .withMessage('O campo (clt_email) precisa ter um formato válido de e-mail'),

    (req, res, next) => {
        const erros = validationResult(req);
        
        if(!erros.isEmpty()){
            res.status(400).json({erros: erros.array()});
            console.log(erros);
            return;
        }

        next();
    }
];
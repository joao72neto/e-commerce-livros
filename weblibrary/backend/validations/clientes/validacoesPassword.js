const {body, validationResult} = require('express-validator');

//Validando a senha enviada pelo usuário
module.exports.validarPassword = [

    body('clt_senha')
        .isLength({min: 8}).withMessage('A senha deve ter pelo menos 8 caracteres')
        .matches(/[a-z]/).withMessage('A senha deve conter pelo menos uma letra minúscula')
        .matches(/[A-Z]/).withMessage('A senha deve conter pelo menos uma letra maiúscula')
        .matches(/[\W_]/).withMessage('A senha deve conter pelo menos um caractere especial')
        .matches(/[0-9]/).withMessage('A senha deve conter pelo menos um número'),


    //Retornando os erros 
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
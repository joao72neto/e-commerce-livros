const {body, validationResult} = require('express-validator');


//Validando os dados inseridos para o cartão
module.exports.validarCard = [

    body('car_nome')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
        .withMessage('O campo (car_nome) não pode conter valores numéricos'),
    
    body('car_numero')
        .isNumeric()
        .withMessage('O campo (car_numero) precisa ter apenas valores numéricos')
        .isLength({min: 13, max: 19})
        .withMessage('O campo (car_numero) precisa ter de 13 a 19 dígitos'),

    body('car_bandeira')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
        .withMessage('O campo(car_bandeira) não pode conter valores numéricos'),

    body('car_cvv')
        .isNumeric()
        .withMessage('O campo (car_cvv) precisa ter apenas valores numéricos')
        .isLength({min: 3, max: 4})
        .withMessage('O campo (car_cvv) deve conter de 3 a 4 dígitos'),

    (req, res, next) => {
        const erros = validationResult(req);
        
        if(!erros.isEmpty()){
            res.status(404).json({erros: erros.array()});
            return;
        }

        next();
    }
]
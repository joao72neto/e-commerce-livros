const express = require('express');
const router = express.Router();
const controllerSignup = require('../../controller/clientes/controllerSignup');
const { validarSignup }  = require('../../validations/clientes/signup/validacoesSignup');
const { validarSignupAlt } = require('../../validations/clientes/signup/validacoesSignupAlt')

 
//Rotas para páginas
router.get('/clientes/signup', controllerSignup.getSignup);
router.get('/clientes/signup/:clt_id', controllerSignup.getSignupAlt);

//Atualizando dados
router.put('/clientes/signup/:clt_id', 
    validarSignupAlt, 
    controllerSignup.putSignupAlt
);

//Inserindo dados
router.post('/clientes/signup', 
    validarSignup,
    controllerSignup.postSignup
);

module.exports = router;
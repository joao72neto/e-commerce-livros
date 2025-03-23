const express = require('express');
const router = express.Router();
const controllerSignup = require('../../controller/clientes/controllerSignup');
 
//Rotas para páginas
router.get('/clientes/signup', controllerSignup.getSignup);
router.get('/clientes/signup/:clt_id', controllerSignup.getSignupAlt);

//Atualizando dados
router.put('/clientes/signup/:clt_id', controllerSignup.putSignupAlt)

//Inserindo dados
router.post('/clientes/signup', controllerSignup.postSignup);

module.exports = router;
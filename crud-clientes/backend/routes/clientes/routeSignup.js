const express = require('express');
const router = express.Router();
const controllerSignup = require('../../controller/clientes/controllerSignup');
 
//Rotas para páginas
router.get('/signup', controllerSignup.getSignup);
router.get('/signup/:clt_id', controllerSignup.getSignupAlt);

//Atualizando dados
router.put('/signup/:clt_id', controllerSignup.putSignupAlt)

//Inserindo dados
router.post('/signup', controllerSignup.postSignup);

module.exports = router;
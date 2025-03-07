const express = require('express');
const router = express.Router();
const controllerSignup = require('../controller/controllerSignup');
 
//Rotas para páginas
router.get('/signup', controllerSignup.getSignup);

//Inserindo dados
router.post('/signup', controllerSignup.postSignup);

module.exports = router;
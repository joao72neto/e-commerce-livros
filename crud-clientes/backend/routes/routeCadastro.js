const express = require('express');
const router = express.Router();
const controllerCadastro = require('../controller/controllerCadastro');

//Rotas para páginas
router.get('/cadastro', controllerCadastro.getCadastro);

module.exports = router;
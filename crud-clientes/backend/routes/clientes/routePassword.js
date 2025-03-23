const express = require('express');
const router = express.Router();
const controllerPassword = require('../../controller/clientes/controllerPassword');

//Rotas para páginas
router.get('/clientes/password/:clt_id', controllerPassword.getPassword);

//Alterando a senha
router.patch('/clientes/password/:clt_id', controllerPassword.patchPassword);

module.exports = router;
const express = require('express');
const router = express.Router();
const controllerInativos = require('../../controller/clientes/controllerInativos');

//Rotas para páginas
router.get('/clientes/inativos', controllerInativos.getInativos);

module.exports = router;
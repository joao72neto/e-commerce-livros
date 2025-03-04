const express = require('express');
const router = express.Router();
const controllerInativos = require('../controller/controllerInativos');

//Rotas
router.get('/inativos', controllerInativos.getInativos);

module.exports = router;
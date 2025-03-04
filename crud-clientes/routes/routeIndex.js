const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/controllerIndex');

//Rotas
router.get('/', controllerIndex.getIndex);
router.get('/api/clientes', controllerIndex.getApiClientes);

module.exports = router;
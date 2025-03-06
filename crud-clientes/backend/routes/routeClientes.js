const express = require('express');
const router = express.Router();
const controllerClientes = require('../controller/controllerClientes');

//Rotas para páginas
router.get('/', controllerClientes.getClientes);

//Rotas para apis
router.get('/api/clientes/:id', controllerClientes.getApiClientesId);

module.exports = router;
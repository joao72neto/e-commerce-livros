const express = require('express');
const router = express.Router();
const controllerClientes = require('../controller/controllerClientes');

//Rotas
router.get('/', controllerClientes.getClientes);
router.get('/api/clientes/:id', controllerClientes.getApiClientesId);

module.exports = router;
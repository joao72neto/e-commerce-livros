const express = require('express');
const router = express.Router();
const controllerPedidos = require('../../controller/compras/controllerPedidos');

//Rotas para páginas
router.get('/pedidos', controllerPedidos.getPedidos);

module.exports = router;
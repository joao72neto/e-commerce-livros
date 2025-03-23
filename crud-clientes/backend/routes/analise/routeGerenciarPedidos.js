const express = require('express');
const router = express.Router();
const controllerGerenciarPedidos = require('../../controller/analise/controllerGerenciarPedidos');

//Rotas para páginas
router.get('/pedidos/gerenciar', controllerGerenciarPedidos.getGerenciarPedidos);

module.exports = router;
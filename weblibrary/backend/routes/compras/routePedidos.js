const express = require('express');
const router = express.Router();
const controllerPedidos = require('../../controller/compras/controllerPedidos');

//Rotas para páginas
router.get('/pedidos', controllerPedidos.getPedidos);

//Rota para adição de pedidos
router.post('/pedidos/add', controllerPedidos.postPedido);

//APIs
router.get('/api/pedidos/:clt_id', controllerPedidos.getBuscarPedidosClienteId);

module.exports = router;
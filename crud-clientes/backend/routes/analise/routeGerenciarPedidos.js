const express = require('express');
const router = express.Router();
const controllerGerenciarPedidos = require('../../controller/analise/controllerGerenciarPedidos');

//Rotas para páginas
router.get('/pedidos/gerenciar', controllerGerenciarPedidos.getGerenciarPedidos);

//Rota para modificação de dados
router.patch('/pedidos/status/update/', controllerGerenciarPedidos.patchAtualizarStatusPedidoId);

//Rota para inserção de dados
router.post('/pedidos/devolverTrocar', controllerGerenciarPedidos.postDevolverTrocarProduto);

module.exports = router;
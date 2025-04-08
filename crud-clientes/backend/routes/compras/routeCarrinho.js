const express = require('express');
const router = express.Router();
const controllerCarrinho = require('../../controller/compras/controllerCarrinho');

//Rotas para páginas
router.get('/carrinho', controllerCarrinho.getCarrinho);

//Rotas para apis
router.get('/api/carrinho/:clt_id', controllerCarrinho.getApiCarrinhoClienteId);

//Rotas para deletar dados
router.delete('/carrinho/delete/:lvr_id', controllerCarrinho.deleteCarrinhoId);

//Rotas para inserção de dados
router.post('/carrinho/add', controllerCarrinho.postCarrinho);

module.exports = router;
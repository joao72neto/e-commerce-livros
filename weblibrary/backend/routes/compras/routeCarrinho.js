const express = require('express');
const router = express.Router();
const controllerCarrinho = require('../../controller/compras/controllerCarrinho');

//Rotas para páginas
router.get('/carrinho', controllerCarrinho.getCarrinho);

//Rotas APIs
router.get('/api/carrinho/:clt_id', controllerCarrinho.getCarrinhoClienteId);

//Rotas para inserção de dados
router.post('/carrinho/add', controllerCarrinho.postCarrinho);

//Rotas para deletar dados
router.delete('/carrinho/delete/:lvr_id', controllerCarrinho.deleteCarrinhoId);

//Rotas para atualizar dados
router.patch('/carrinho/update', controllerCarrinho.patchQtdPrecoCarrinho);

module.exports = router;
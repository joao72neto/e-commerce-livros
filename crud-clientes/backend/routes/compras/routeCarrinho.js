const express = require('express');
const router = express.Router();
const controllerCarrinho = require('../../controller/compras/controllerCarrinho');

//Rotas para páginas
router.get('/carrinho', controllerCarrinho.getCarrinho);

module.exports = router;
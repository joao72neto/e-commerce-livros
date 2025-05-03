const express = require('express');
const router = express.Router();
const controllerProduto = require('../../controller/compras/controllerProduto');

//Rotas para páginas
router.get('/produto/:lvr_id', controllerProduto.getProduto);

module.exports = router;
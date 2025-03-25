const express = require('express');
const router = express.Router();
const controllerEstoque = require('../../controller/analise/controllerEstoque');

//Rotas para páginas
router.get('/estoque', controllerEstoque.getEstoque);
router.get('/estoque/entrada', controllerEstoque.getEstoqueEntrada);

module.exports = router;
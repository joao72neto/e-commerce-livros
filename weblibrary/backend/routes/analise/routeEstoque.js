const express = require('express');
const router = express.Router();
const controllerEstoque = require('../../controller/analise/controllerEstoque');

//Rotas para páginas
router.get('/estoque', controllerEstoque.getEstoque);
router.get('/estoque/entrada', controllerEstoque.getEstoqueEntrada);

//Rota para adicionar item ao estoque
router.post('/estoque/entrada/add', controllerEstoque.postAdicionarEstoque);

//Rotas para APIs
router.get('/api/fornecedores', controllerEstoque.getApiTodosFornecedores);
router.get('/api/grpPrecificacao', controllerEstoque.getApiTodosGrpPrecificacao);

module.exports = router;
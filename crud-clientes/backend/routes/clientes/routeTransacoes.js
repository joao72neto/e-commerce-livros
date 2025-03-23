const express = require('express');
const router = express.Router();
const controllerTransacoes = require('../../controller/clientes/constrollerTransacoes');

//Rotas para páginas
router.get('/transacoes/:clt_id', controllerTransacoes.getTransacoes);

module.exports = router;
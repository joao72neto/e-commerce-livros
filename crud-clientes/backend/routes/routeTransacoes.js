const express = require('express');
const router = express.Router();
const controllerTransacoes = require('../controller/constrollerTransacoes');

//Rotas
router.get('/transacoes/:id', controllerTransacoes.getTransacoes);
router.get('/api/transacoes', controllerTransacoes.getApiTransacoes);
router.get('/api/transacoes/:id', controllerTransacoes.getApiTransacoesClienteId);

module.exports = router;
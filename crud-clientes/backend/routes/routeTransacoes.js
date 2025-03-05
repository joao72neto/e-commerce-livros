const express = require('express');
const router = express.Router();
const controllerTransacoes = require('../controller/constrollerTransacoes');

//Rotas
router.get('/transacoes', controllerTransacoes.getTransacoes);
router.get('/api/transacoes', controllerTransacoes.getApiTransacoes);

module.exports = router;
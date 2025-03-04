const express = require('express');
const router = express.Router();
const controllerTransacoes = require('../controller/constrollerTransacoes');

//Rotas
router.get('/transacoes', controllerTransacoes.getTransacoes);

module.exports = router;
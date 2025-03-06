const express = require('express');
const router = express.Router();
const controllerTransacoes = require('../controller/constrollerTransacoes');

//Rotas
router.get('/transacoes/:id', controllerTransacoes.getTransacoes);

//Exportnado as rotas
module.exports = router;
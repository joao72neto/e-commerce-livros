const express = require('express');
const router = express.Router();

//Pegando todas as rotas
const routeClientes = require('./routeClientes');
const routeAddress = require('./routeAddress');
const routeCard = require('./routeCard');
const routeInativos = require('./routeInativos');
const routePassword = require('./routePassword');
const routeSignup = require('./routeSignup');
const routeTransacoes = require('./routeTransacoes');

//Juntando todas as rotas
router.use('/', routeClientes);
router.use('/', routeAddress);
router.use('/', routeCard);
router.use('/', routeInativos);
router.use('/', routePassword);
router.use('/', routeSignup);
router.use('/', routeTransacoes);

//Expotando as rotas pra o app
module.exports = router;
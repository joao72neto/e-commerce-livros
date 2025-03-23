const express = require('express');
const router = express.Router();

//Pegando todas as rotas dos clientes
const routeClientes = require('./clientes/routeClientes');
const routeAddress = require('./clientes/routeAddress');
const routeCard = require('./clientes/routeCard');
const routeInativos = require('./clientes/routeInativos');
const routePassword = require('./clientes/routePassword');
const routeSignup = require('./clientes/routeSignup');
const routeTransacoes = require('./clientes/routeTransacoes');
const routeIndex = require('./routeIndex');

//Juntando todas as rotas dos clientes
router.use('/', routeClientes);
router.use('/', routeAddress);
router.use('/', routeCard);
router.use('/', routeInativos);
router.use('/', routePassword);
router.use('/', routeSignup);
router.use('/', routeTransacoes);
router.use('/', routeIndex);

//Expotando as rotas pra o app
module.exports = router;
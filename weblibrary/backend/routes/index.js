const express = require('express');
const router = express.Router();


//Pegando a rotas gerais
const routeIndex = require('./routeIndex');
const routePerfil = require('./routePerfil');
const routeCadastro = require('./routeCadastro');


router.use('/', routeIndex);
router.use('/', routePerfil);
router.use('/', routeCadastro);

//Pegando todas as rotas dos clientes
const routeClientes = require('./clientes/routeClientes');
const routeAddress = require('./clientes/routeAddress');
const routeCard = require('./clientes/routeCard');
const routeInativos = require('./clientes/routeInativos');
const routePassword = require('./clientes/routePassword');
const routeSignup = require('./clientes/routeSignup');
const routeTransacoes = require('./clientes/routeTransacoes');

router.use('/', routeClientes);
router.use('/', routeAddress);
router.use('/', routeCard);
router.use('/', routeInativos);
router.use('/', routePassword);
router.use('/', routeSignup);
router.use('/', routeTransacoes);

//Pegando as rotas das compras
const routeCarrinho = require('../routes/compras/routeCarrinho');
const routePagamento = require('../routes/compras/routePagamento');
const routePedidos = require('../routes/compras/routePedidos');
const routeProduto = require('../routes/compras/routeProduto');

router.use('/', routeCarrinho);
router.use('/', routePagamento);
router.use('/', routePedidos);
router.use('/', routeProduto);


//Pegando as rotas dos livros
const routeBooks = require('../routes/books/routeBooks');

router.use('/', routeBooks);

//Pegando as rotas das análises
const routeGerenciarPedidos = require('../routes/analise/routeGerenciarPedidos');
const routeHistoricoVendas = require('../routes/analise/routeHistoricoVendas');
const routeLogs = require('../routes/analise/routeLogs');
const routeEstoque = require('../routes/analise/routeEstoque');

router.use('/', routeGerenciarPedidos);
router.use('/', routeHistoricoVendas);
router.use('/', routeLogs);
router.use('/', routeEstoque);

//Expotando as rotas pra o app
module.exports = router;
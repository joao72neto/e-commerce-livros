const express = require('express');
const router = express.Router();
const controllerHistoricoVendas = require('../../controller/analise/controllerHistoricoVendas');

//Rotas para páginas
router.get('/vendas/historico', controllerHistoricoVendas.getHistoricoVendas);

//Rotas para APIS
router.get('/api/vendas/historico', controllerHistoricoVendas.getApiLivrosVendidos);
router.get('/api/vendas/historico/datas', controllerHistoricoVendas.getApiDatasComVendas);
module.exports = router;
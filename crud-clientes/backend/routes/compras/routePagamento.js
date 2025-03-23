const express = require('express');
const router = express.Router();
const controllerPagamento = require('../../controller/compras/constrollerPagamento');

//Rotas para páginas
router.get('/pagamento', controllerPagamento.getPagamento);

module.exports = router;
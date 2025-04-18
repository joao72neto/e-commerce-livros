const express = require('express');
const router = express.Router();
const controllerPagamento = require('../../controller/compras/constrollerPagamento');

//Rotas para páginas
router.get('/pagamento', controllerPagamento.getPagamento);

//Rotas para remoção de dados
router.delete('/cupom/delete/:cup_id', controllerPagamento.deleteCupomId);

module.exports = router;
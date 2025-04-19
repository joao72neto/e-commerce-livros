const express = require('express');
const router = express.Router();
const controllerPagamento = require('../../controller/compras/constrollerPagamento');

//Rotas para páginas
router.get('/pagamento', controllerPagamento.getPagamento);

//Rotas para remoção de dados
router.delete('/cupom/delete/:cup_id', controllerPagamento.deleteCupomId);


//Rotas de atualização de dados
router.patch ('/cupom/ativar/:cup_id', controllerPagamento.patchAtivarCupom);
router.patch('/cupom/inativar/:cup_id', controllerPagamento.patchInativarCupom);

module.exports = router;
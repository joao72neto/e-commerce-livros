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

//Rota para adição de dados
router.post('/cupom/add', controllerPagamento.postAdicionarCupons);

//APIs
router.get('/api/cupons/ativos/:clt_id', controllerPagamento.getApiCuponsAtivosClienteId);
router.get('/api/cupons/inativos/:clt_id', controllerPagamento.getApiCuponsInativosClienteId);


module.exports = router;
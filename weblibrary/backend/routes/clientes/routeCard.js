const express = require('express');
const router = express.Router();
const controllerCard = require('../../controller/clientes/controllerCard');
const { validarCard } = require('../../validations/clientes/validacoesCard')

//Rotas para páginas
router.get('/clientes/card/:clt_id', controllerCard.getCard);
router.get('/clientes/card/:clt_id/add', controllerCard.getCardAdd);
router.get('/clientes/card/:clt_id/alt/:car_id', controllerCard.getCardAlt);

//Atualizando dados
router.put('/clientes/card/:clt_id/alt/:car_id', validarCard, controllerCard.putCardAlt);
router.patch('/clientes/card/desativar/:clt_id', controllerCard.patchDesativarCartoesClienteId);
router.patch('/card/default/update', controllerCard.patchUpdateDefaulCard);

//Inserção de dados
router.post('/clientes/card/:clt_id/add', validarCard, controllerCard.postCardAdd);

//Deletando dados
router.delete('/card/delete/:clt_id/:car_id', controllerCard.deleteCardId);

//APIs
router.get('/api/card/clt_id/:clt_id', controllerCard.getBuscarCartoesClienteId);

module.exports = router;

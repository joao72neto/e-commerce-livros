const express = require('express');
const router = express.Router();
const controllerCard = require('../../controller/clientes/controllerCard');

//Rotas para páginas
router.get('/clientes/card/:clt_id', controllerCard.getCard);
router.get('/clientes/card/:clt_id/add', controllerCard.getCardAdd);
router.get('/clientes/card/:clt_id/alt/:car_id', controllerCard.getCardAlt);

//Atualizando dados
router.put('/clientes/card/:clt_id/alt/:car_id', controllerCard.putCardAlt);

//Inserção de dados
router.post('/clientes/card/:clt_id/add', controllerCard.postCardAdd);

module.exports = router;

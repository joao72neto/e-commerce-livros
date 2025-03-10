const express = require('express');
const router = express.Router();
const controllerCard = require('../controller/controllerCard');

//Rotas para páginas
router.get('/card/:clt_id', controllerCard.getCard);
router.get('/card/:clt_id/add', controllerCard.getCardAdd);
router.get('/card/:clt_id/alt/:car_id', controllerCard.getCardAlt);

//Atualizando dados
router.put('/card/:clt_id/alt/:car_id', controllerCard.putCardAlt);

//Inserção de dados
router.post('/card/:clt_id/add', controllerCard.postCardAdd);

module.exports = router;

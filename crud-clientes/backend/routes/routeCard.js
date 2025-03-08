const express = require('express');
const router = express.Router();
const controllerCard = require('../controller/controllerCard');

//Rotas para páginas
router.get('/card/:clt_id', controllerCard.getCard);
router.get('/card/:clt_id/add', controllerCard.getCardAdd);
router.get('/card/:clt_id/alt', controllerCard.getCardAlt);

module.exports = router;

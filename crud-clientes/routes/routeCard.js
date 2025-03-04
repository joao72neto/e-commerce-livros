const express = require('express');
const router = express.Router();
const controllerCard = require('../controller/controllerCard');

//Rotas
router.get('/card', controllerCard.getCard);
router.get('/card/add', controllerCard.getCardAdd);
router.get('/card/alt', controllerCard.getCardAlt);

module.exports = router;

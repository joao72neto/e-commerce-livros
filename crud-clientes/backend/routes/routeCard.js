const express = require('express');
const router = express.Router();
const controllerCard = require('../controller/controllerCard');

//Rotas para páginas
router.get('/card/:id', controllerCard.getCard);
router.get('/card/:id/add', controllerCard.getCardAdd);
router.get('/card/:id/alt', controllerCard.getCardAlt);

module.exports = router;

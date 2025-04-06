const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/controllerIndex');

//Rotas para páginas
router.get('/', controllerIndex.getIndex);
router.get('/login/:clt_id', controllerIndex.getIndexLogado);

module.exports = router;
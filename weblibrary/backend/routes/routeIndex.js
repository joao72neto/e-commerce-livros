const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/controllerIndex');

//Rotas para páginas
router.get('/', controllerIndex.getIndex);

//Outras
router.get('/api/version', controllerIndex.getServerVersion);

module.exports = router;
const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/controllerIndex');

//Rotas para páginas
router.get('/', controllerIndex.getIndex);
router.get('/home/:clt_id', controllerIndex.getIndexHome);

module.exports = router;
const express = require('express');
const router = express.Router();
const controllerLogs = require('../../controller/analise/controllerLogs');

//Rotas para páginas
router.get('/logs', controllerLogs.getLogs);

module.exports = router;
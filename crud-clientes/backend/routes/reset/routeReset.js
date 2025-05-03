const express = require('express');
const router = express.Router();
const controllerReset = require('../../controller/reset/controllerReset');

//Rotas para páginas
router.post('/banco/resetar', controllerReset.postResetarBanco);
router.post('/banco/povoar', controllerReset.postPovoarBanco);
router.post('/banco/resetarPovoar', controllerReset.postResetarPovoarBanco);

module.exports = router;
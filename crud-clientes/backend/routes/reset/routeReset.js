const express = require('express');
const router = express.Router();
const controllerReset = require('../../controller/reset/controllerReset');

//Rotas para páginas
router.post('/reset/database', controllerReset.postResetarDatabase);

module.exports = router;
const express = require('express');
const router = express.Router();
const controllerPassword = require('../controller/controllerPassword');

//Rotas para páginas
router.get('/password', controllerPassword.getPassword);

module.exports = router;
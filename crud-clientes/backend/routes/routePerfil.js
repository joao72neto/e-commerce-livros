const express = require('express');
const router = express.Router();
const controllerPerfil = require('../controller/controllerPerfil');

//Rotas para páginas
router.get('/perfil', controllerPerfil.getPerfil);

module.exports = router;
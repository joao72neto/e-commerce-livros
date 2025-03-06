const express = require('express');
const router = express.Router();
const controllerSignup = require('../controller/controllerSignup');
 
//Rotas para páginas
router.get('/signup', controllerSignup.getSignup);

module.exports = router;
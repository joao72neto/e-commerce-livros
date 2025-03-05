const express = require('express');
const router = express.Router();
const controllerSignup = require('../controller/controllerSignup');
 
//Rotas
router.get('/signup', controllerSignup.getSignup);

module.exports = router;
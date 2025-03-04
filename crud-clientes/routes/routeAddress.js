const express = require('express');
const router = express.Router();
const controllerAddress = require('../controller/controllerAddress');

//Rotas
router.get('/address', controllerAddress.getAddress);
router.get('/address/add',controllerAddress.getAddressAdd);
router.get('/address/alt', controllerAddress.getAddressAlt);

module.exports = router;
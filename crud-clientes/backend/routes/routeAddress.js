const express = require('express');
const router = express.Router();
const controllerAddress = require('../controller/controllerAddress');

//Rotas
router.get('/address/:id', controllerAddress.getAddress);
router.get('/address/:id/add',controllerAddress.getAddressAdd);
router.get('/address/:id/alt', controllerAddress.getAddressAlt);
router.get('/api/address/:id', controllerAddress.getApiEnderecoId);

module.exports = router;
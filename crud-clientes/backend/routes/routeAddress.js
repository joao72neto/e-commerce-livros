const express = require('express');
const router = express.Router();
const controllerAddress = require('../controller/controllerAddress');

//Rotas para página
router.get('/address/:id', controllerAddress.getAddress);
router.get('/address/:id/add/:id',controllerAddress.getAddressAdd);
router.get('/address/:id/alt/:id', controllerAddress.getAddressAlt);

//Rotas para apis
router.get('/api/address/:id', controllerAddress.getApiEnderecoId);

module.exports = router;
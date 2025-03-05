const express = require('express');
const router = express.Router();
const controllerAddress = require('../controller/controllerAddress');

//Rotas
router.get('/address/:id', controllerAddress.getAddress);
router.get('/address/add',controllerAddress.getAddressAdd);
router.get('/address/alt', controllerAddress.getAddressAlt);
//router.get('/api/address/:id', controllerAddress.getApiEnderecosClienteId);

module.exports = router;
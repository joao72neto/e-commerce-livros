const express = require('express');
const router = express.Router();
const controllerAddress = require('../controller/controllerAddress');

//Rotas para página
router.get('/address/:clt_id', controllerAddress.getAddress);
router.get('/address/:clt_id/add', controllerAddress.getAddressAdd);
router.get('/address/:clt_id/alt/:end_id', controllerAddress.getAddressAlt);

//Rota para alterar dados
router.put('/address/:clt_id/alt/:end_id', controllerAddress.putAddressAlt);

//Rota para adicionar um endereco
router.post('/address/:clt_id/add', controllerAddress.postAddressAdd);

//Rotas para apis
router.get('/api/address/:end_id', controllerAddress.getApiEnderecoId);

module.exports = router;
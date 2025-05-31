const express = require('express');
const router = express.Router();
const controllerAddress = require('../../controller/clientes/controllerAddress');
const { validarAddress } = require('../../validations/clientes/validacoesAddress')

//Rotas para página
router.get('/clientes/address/:clt_id', controllerAddress.getAddress);
router.get('/clientes/address/:clt_id/add', controllerAddress.getAddressAdd);
router.get('/clientes/address/:clt_id/alt/:end_id', controllerAddress.getAddressAlt);

//Rota para alterar dados
router.put('/clientes/address/:clt_id/alt/:end_id', 
    validarAddress, 
    controllerAddress.putAddressAlt
);
router.patch('/clientes/address/desativar/:clt_id', controllerAddress.patchDesativarEnderecosClienteId);

//Rota para adicionar um endereco
router.post('/clientes/address/:clt_id/add', 
    validarAddress, 
    controllerAddress.postAddressAdd
);

//Rotas para apis
router.get('/api/address/:end_id', controllerAddress.getApiEnderecoId);
router.get('/api/address/clt_id/:clt_id', controllerAddress.getApiEnderecoClienteId);

//Deletando dados
router.delete('/address/delete/:clt_id/:end_id', controllerAddress.deleteAddressId);

module.exports = router;
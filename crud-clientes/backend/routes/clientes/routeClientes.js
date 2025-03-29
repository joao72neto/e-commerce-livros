const express = require('express');
const router = express.Router();
const controllerClientes = require('../../controller/clientes/controllerClientes');
const { validarFiltro } = require('../../validations/clientes/validacoesFiltro');

//Rotas para páginas
router.get('/clientes', 
    validarFiltro,
    controllerClientes.getClientes);

//Rotas para apis
router.get('/api/clientes/id/:clt_id', controllerClientes.getApiClienteId);
router.get('/api/clientes/ativos', controllerClientes.getApiClientesAtivos);
router.get('/api/clientes/inativos', controllerClientes.getApiClientesInativos);

//Rotas para modificação dos dados
router.patch('/clientes/inativar/:clt_id', controllerClientes.patchInativarCliente);
router.patch('/clientes/ativar/:clt_id', controllerClientes.patchAtivarCliente);

//Rotas para deletar dados
router.delete('/clientes/delete/:clt_id', controllerClientes.deleteClienteId);

module.exports = router;
const {buscarClientesId, buscarClientesAtivos, buscarClientesInativos, inativarCliente, ativarCliente} = require("../model/modelClientes");

//Páginas
module.exports.getClientes = async (req, res) => {
    const clientes = await buscarClientesAtivos();
    res.render('clientes', {clientes: clientes});
};

//Alterando dados
module.exports.patchInativarCliente = async (req, res) => {
    await inativarCliente(req.params.id);
};

module.exports.patchAtivarCliente = async (req, res) => {
    await ativarCliente(req.params.id);
};


//Apis para acessar os dados dos clientes
module.exports.getApiClientesId = async (req, res) => {
    const cliente = await buscarClientesId(req.params.id);
    res.json(cliente);
};

module.exports.getApiClientesAtivos = async (req, res) => {
    const clientes = await buscarClientesAtivos();
    res.json(clientes);
};

module.exports.getApiClientesInativos = async (req, res) => {
    const clientes = await buscarClientesInativos();
    res.json(clientes);
};


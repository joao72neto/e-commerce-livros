const { buscarTodosClientes, buscarClientesId } = require("../model/modelClientes");

module.exports.getClientes = async (req, res) => {
    const clientes = await buscarTodosClientes();
    res.render('clientes', {clientes: clientes});
}

module.exports.getApiClientes = async (req, res) => {
    const clientes = await buscarTodosClientes();
    res.json(clientes);
};

module.exports.getApiClientesId = async (req, res) => {
    const cliente = await buscarClientesId(req.params.id);
    res.json(cliente);
};


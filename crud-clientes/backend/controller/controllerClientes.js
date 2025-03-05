const { buscarTodosClientes } = require("../model/modelClientes");

module.exports.getClientes = async (req, res) => {
    const clientes = await buscarTodosClientes();
    res.render('../../frontend/views/clientes', {clientes: clientes});
}

module.exports.getApiClientes = async (req, res) => {
    const clientes = await buscarTodosClientes();
    res.json(clientes);
};


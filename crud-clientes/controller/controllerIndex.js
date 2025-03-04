const { buscarTodosClientes } = require("../model/crud-model");

module.exports.getIndex = async (req, res) => {
    const clientes = await buscarTodosClientes();
    res.render('index', {clientes: clientes});
}

module.exports.getApiClientes = async (req, res) => {
    const clientes = await buscarTodosClientes();
    res.json(clientes);
};


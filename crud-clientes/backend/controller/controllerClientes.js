const { buscarTodosClientes, buscarClientesId } = require("../model/modelClientes");

//Páginas
module.exports.getClientes = async (req, res) => {
    const clientes = await buscarTodosClientes();
    res.render('clientes', {clientes: clientes});
}

//Apis para acessar os dados dos clientes
module.exports.getApiClientesId = async (req, res) => {
    const cliente = await buscarClientesId(req.params.id);
    res.json(cliente);
};


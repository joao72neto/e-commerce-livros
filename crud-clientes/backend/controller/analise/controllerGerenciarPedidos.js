const { buscarClientesPedidos } = require('../../model/clientes/modelClientes');
const { buscarPedidosClienteId } = require('../../model/compras/modelPedidos');

//Página
module.exports.getGerenciarPedidos = async (req, res) => {

    const clientes = await buscarClientesPedidos();

    res.render('analise/gerenciarPedidos', {
        clientes: clientes
    });
};

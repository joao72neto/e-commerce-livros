const { adicionarPedido } = require('../../model/compras/modelPedidos');
const { buscarPedidosClienteId } = require('../../model/compras/modelPedidos');
const { buscarClienteLogado } = require('../../model/clientes/modelClientes');

//Página
module.exports.getPedidos = async (req, res) => {

    const cliente = await buscarClienteLogado();
    const pedidos = await buscarPedidosClienteId(cliente[0].clt_id);

    return res.render('compras/pedidos', {
        pedidos: pedidos,
        cliente: cliente
    });
};

//Inserção de pedidos
module.exports.postPedido = async (req, res) => {
    try{
    
        await adicionarPedido(req.body);
        return res.status(201).json({msg: 'Pedido adicionado a lista de pedidos'})

    }catch(err){
        console.error(`Erro no postPedido - controllerPedido: ${err}`);
        return res.status(500).json({msg:'Erro ao adiciona pedido à lista de pedidos'});
    }
};

//APIs
module.exports.getBuscarPedidosClienteId = async (req, res) => {
    const pedidos = await buscarPedidosClienteId(req.params.clt_id);
    return res.json(pedidos);
}
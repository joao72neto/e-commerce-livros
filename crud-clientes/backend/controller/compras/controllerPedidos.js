const { adicionarPedido } = require('../../model/compras/modelPedidos');

//Página
module.exports.getPedidos = (req, res) => {
    res.render('compras/pedidos');
};

//Inserção de pedidos
module.exports.postPedido = async (req, res) => {
    try{
    
        await adicionarPedido(req.body);
        res.status(201).json({msg: 'Pedido adicionado a lista de pedidos'})

    }catch(err){
        console.error(`Erro no postPedido - controllerPedido: ${err}`);
        res.status(500).json({msg:'Erro ao adiciona pedido à lista de pedidos'});
    }
};

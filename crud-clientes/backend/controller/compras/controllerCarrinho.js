const { buscarCarrinhoClienteId } = require('../../model/compras/modelCarrinho');
const { adicionarCarrinho } = require('../../model/compras/modelCarrinho');
const { removerCarrinhoId } = require('../../model/compras/modelCarrinho');


//Página
module.exports.getCarrinho = (req, res) => {
    res.render('compras/carrinho');
};


//Buscando dados
module.exports.getApiCarrinhoClienteId = async (req, res) => {
    const carrinho = buscarCarrinhoClienteId(req.params.clt_id);
    res.json(carrinho);
};

//Inserindo dados
module.exports.postCarrinho = async (req, res) => {
    try{

        await adicionarCarrinho(req.body);
        res.status(201).json({msg: 'Item adicionado ao carrinho'})

    }catch(err){
        console.error(`Erro no postCarrinho - controllerCarrinho: ${err}`);
        res.status(500).json({msg:'Erro ao adiciona item ao carrinho'});
    }
};

//Removendo dados
module.exports.deleteCarrinhoId = async (req, res) => {
    try{

        await removerCarrinhoId(req.params.lvr_id);
        res.status(204).json({msg: 'Item removido do carrinho'})

    }catch(err){
        console.error(`Erro no deleteCarrinhoId - controllerCarrinho: ${err}`);
        res.status(500).json({msg:'Erro ao remover item do carrinho'});
    }
};
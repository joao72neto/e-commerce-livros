const { buscarCarrinhoClienteId } = require('../../model/compras/modelCarrinho');
const { adicionarCarrinho } = require('../../model/compras/modelCarrinho');
const { removerCarrinhoId } = require('../../model/compras/modelCarrinho');
const { buscarClienteLogado } = require('../../model/clientes/modelClientes')
const { atualizarQtdPrecoCarrinho } = require('../../model/compras/modelCarrinho');

//Página
module.exports.getCarrinho = async (req, res) => {
    const cliente = await buscarClienteLogado();
    const carrinho = await buscarCarrinhoClienteId(cliente[0].clt_id);

    res.render('compras/carrinho', {
        carrinho: carrinho
    });
};

//APIs
module.exports.getCarrinhoClienteId = async (req, res) => {
    const carrinho = await buscarCarrinhoClienteId(req.params.clt_id);
    res.json(carrinho);
}

//Inserindo dados
module.exports.postCarrinho = async (req, res) => {
    try{

        const result = await adicionarCarrinho(req.body);

        if(result === 409){
            return res.status(409).json({msg: 'Item já está no carrinho'});
        }

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

//Atualizando os dados
module.exports.patchQtdPrecoCarrinho = async (req, res) => {
    try{

        const lvr_id = req.body.lvr_id; 
        const crr_qtd = req.body.crr_qtd;

        await atualizarQtdPrecoCarrinho(crr_qtd, lvr_id);
        res.status(204).json({msg: 'Item atualizado com sucesso!'})

    }catch(err){
        console.error(`Erro no patchQtdPrecoCarrinho - controllerCarrinho: ${err}`);
        res.status(500).json({msg:'Erro ao atuaizar a qtd e preço do carrinho'});
    }
};
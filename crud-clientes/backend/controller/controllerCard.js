const { buscarCartoesClienteId, cadastrarCartao } = require("../model/modelCard");

//Páginas
module.exports.getCard = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.id);
    res.render('card/card-main', {cartoes: cartoes});
};

module.exports.getCardAdd = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.id);
    res.render('card/card-add', {cartoes: cartoes});
};

module.exports.getCardAlt = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.id);
    res.render('card/card-alt', {cartoes: cartoes});
};

//Inserindo dados
module.exports.postCard = async (req, res) => {
    try{
        await cadastrarCartao(req.body);
        res.sendStatus(200);
    }catch(err){
        console.error(`Erro ${err}`);
        res.sendStatus(500);
    }
};

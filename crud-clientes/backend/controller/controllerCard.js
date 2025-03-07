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

const { atualizarCard, buscarCartaoId, buscarCartoesClienteId, cadastrarCartao } = require("../model/modelCard");

//Páginas
module.exports.getCard = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);
    res.render('card/card-main', {cartoes: cartoes});
};

module.exports.getCardAdd = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);
    res.render('card/card-add', {cartoes: cartoes});
};

module.exports.getCardAlt = async (req, res) => {
    const cartoes = await buscarCartaoId(req.params.car_id);
    res.render('card/card-alt', {cartoes: cartoes});
};

//Inserção de dados
module.exports.postCardAdd = async (req, res) => {
    try{
        await cadastrarCartao(req.body)
        res.sendStatus(200);
        
    }catch(err){
        console.error(`Erro: ${err}`);
        res.sendStatus(500);
    }
};


//Atualizando os dados dos cartões
module.exports.putCardAlt = async (req, res) => {
    const cartao = await atualizarCard(req.body, req.params.car_id);
    res.json(cartao);
};

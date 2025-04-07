const { atualizarCard, buscarCartaoId, buscarCartoesClienteId, cadastrarCartao, deletarCardId, deletarCardsClienteId } = require("../../model/clientes/modelCard");

//Páginas
module.exports.getCard = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);
    res.render('clientes/card/card-main', {cartoes: cartoes});
};

module.exports.getCardAdd = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);
    const retorno = req.query.retorno;
    res.render('clientes/card/card-add', {
        cartoes: cartoes,
        retorno: retorno
    });
};

module.exports.getCardAlt = async (req, res) => {
    const cartoes = await buscarCartaoId(req.params.car_id);
    const retorno = req.query.retorno;
    res.render('clientes/card/card-alt', {
        cartoes: cartoes,
        retorno: retorno
    });
};

//Inserção de dados
module.exports.postCardAdd = async (req, res) => {
    try{
        await cadastrarCartao(req.body)
        res.sendStatus(200);
        
    }catch(err){
        console.error(`Erro no postCardAdd - controllerCard: ${err}`);
        res.sendStatus(500);
    }
};


//Deletando dados
module.exports.deleteCardId = async (req, res) => {
    try {
        const cartoes = await buscarCartoesClienteId(req.params.clt_id);

        if (cartoes.length <= 1) {
            return res.status(400).json({ msg: "O cliente deve ter pelo menos um cartão cadastrado." });
            
        }

        await deletarCardId(req.params.car_id);
        res.sendStatus(204);
    } catch (err) {
        console.error(`Erro no deleteCardId - controllerCard: ${err}`);
        res.sendStatus(500);
    }
};

//Atualizando os dados dos cartões
module.exports.putCardAlt = async (req, res) => {
    const cartao = await atualizarCard(req.body, req.params.car_id);
    res.json(cartao);
};

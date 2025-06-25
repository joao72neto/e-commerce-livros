const { atualizarCard, buscarCartaoId, buscarCartoesClienteId, cadastrarCartao, deletarCardId } = require("../../model/clientes/modelCard");
const { desativarCartoesClienteId } = require('../../model/clientes/modelCard');
const { buscarCartoesClienteIdFiltrado } = require('../../model/clientes/modelCard');
const { registerLog } = require('../../model/analise/modelLogs');
const { buscarClienteId } = require('../../model/clientes/modelClientes');

//Páginas
module.exports.getCard = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);
    return res.render('clientes/card/card-main', {cartoes: cartoes});
};

module.exports.getCardAdd = async (req, res) => {
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);
    const retorno = req.query.retorno;
    const retorno_pag = req.query.retorno_pag;
    const tipo = req.query.tipo;

    return res.render('clientes/card/card-add', {
        cartoes: cartoes,
        retorno: retorno,
        retorno_pag: retorno_pag,
        tipo: tipo
    });
};

module.exports.getCardAlt = async (req, res) => {
    const cartoes = await buscarCartaoId(req.params.car_id);
    const retorno = req.query.retorno;
    const retorno_pag = req.query.retorno_pag;
    const tipo = req.query.tipo;

    return res.render('clientes/card/card-alt', {
        cartoes: cartoes,
        retorno: retorno,
        retorno_pag: retorno_pag,
        tipo: tipo
    });
};

//Log model
let logData = {
    log_clt_id: '',
    log_usuario: '',
    log_operacao: '',
    log_desc: ''
}

//Inserção de dados
module.exports.postCardAdd = async (req, res) => {
    try{
        await cadastrarCartao(req.body);

        //Registering log
        const client = await buscarClienteId(req.body.car_clt_id);
        const userName = client[0].clt_nome;
        logData.log_usuario = req.body.user;
        logData.log_operacao = 'INSERT';
        logData.log_desc = `Novo cartão adicionado para "${userName}"`;
        await registerLog(logData);

        return res.sendStatus(200);
        
    }catch(err){
        console.error(`Erro no postCardAdd - controllerCard: ${err}`);
        return res.sendStatus(500);
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

        //Registering log
        const client = await buscarClienteId(req.params.clt_id);
        const userName = client[0].clt_nome;
        logData.log_usuario = req.body.user;
        logData.log_operacao = 'DELETE';
        logData.log_desc = `Cartão de "${userName}" deletado`;
        await registerLog(logData);

        return res.sendStatus(204);

    } catch (err) {
        console.error(`Erro no deleteCardId - controllerCard: ${err}`);
        return res.sendStatus(500);
    }
};

//Atualizando os dados dos cartões
module.exports.putCardAlt = async (req, res) => {
    const cartao = await atualizarCard(req.body, req.params.car_id);
    return res.json(cartao);
};

module.exports.patchDesativarCartoesClienteId = async (req, res) => {
    try{
        
        await desativarCartoesClienteId(req.params.clt_id);
        return res.status(200).json({msg: 'Cartões desativados com sucesso!'});

    }catch(err){
        console.error(`Erro no patchDesativarCartoesClienteId - controllerCard: ${err}`);
        return res.status(500).json({msg: 'Não foi possível desativar os cartões'});
    }
};

//APIs
module.exports.getBuscarCartoesClienteId = async (req, res) => {
    const cartoes = await buscarCartoesClienteIdFiltrado(req.params.clt_id);
    return res.json(cartoes);
};

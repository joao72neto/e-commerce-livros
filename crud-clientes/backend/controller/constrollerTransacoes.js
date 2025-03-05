const { buscarTodasTransacoes, buscarTransacoesClienteId } = require("../model/modelTransacoes");

module.exports.getTransacoes = (req, res) => {
    res.render('transacoes');
};

module.exports.getApiTransacoes = async (req, res) => {
    const transacoes = await buscarTodasTransacoes();
    res.json(transacoes);
};

module.exports.getApiTransacoesClienteId = async(req, res) => {
    const transacoes = await buscarTransacoesClienteId(req.params.id);
    res.json(transacoes);
};
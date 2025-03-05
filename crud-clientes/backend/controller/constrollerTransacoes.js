const { buscarTodasTransacoes } = require("../model/modelClientes");

module.exports.getTransacoes = (req, res) => {
    res.render('transacoes');
};

module.exports.getApiTransacoes = async (req, res) => {
    const transacoes = await buscarTodasTransacoes();
    res.json(transacoes);
};
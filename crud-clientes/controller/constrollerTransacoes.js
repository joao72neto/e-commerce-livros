const { buscarTodasTransacoes } = require("../model/crud-model");

module.exports.getTransacoes = (req, res) => {
    res.render('transacoes');
};

module.exports.getApiTransacoes = async (req, res) => {
    const transacoes = await buscarTodasTransacoes();
    res.json(transacoes);
};
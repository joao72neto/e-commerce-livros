const { buscarTransacoesClienteId } = require("../model/modelTransacoes");

//Página
module.exports.getTransacoes = async (req, res) => {
    const transacoes = await buscarTransacoesClienteId(req.params.id);
    res.render('transacoes', {transacoes: transacoes});
};

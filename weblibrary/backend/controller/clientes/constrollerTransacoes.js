const { buscarTransacoesClienteId } = require("../../model/clientes/modelTransacoes");

//Página
module.exports.getTransacoes = async (req, res) => {
    const transacoes = await buscarTransacoesClienteId(req.params.clt_id);
    return res.render('clientes/transacoes', {transacoes: transacoes});
};

const { buscarClientesInativos } = require("../../model/clientes/modelClientes");

//Página
module.exports.getInativos = async (req, res) => {
    const inativos = await buscarClientesInativos();
    return res.render('clientes/inativos', {inativos: inativos});
};

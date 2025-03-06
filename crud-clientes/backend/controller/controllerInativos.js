const { buscarClientesInativos } = require("../model/modelClientes");

//Página
module.exports.getInativos = async (req, res) => {
    const inativos = await buscarClientesInativos();
    res.render('inativos', {inativos: inativos});
};

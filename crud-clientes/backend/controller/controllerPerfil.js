const { buscarClienteLogado } = require('../model/clientes/modelClientes');

//Página
module.exports.getPerfil = async (req, res) => {
    const cliente = await buscarClienteLogado();
    console.log(cliente);
    res.render('perfil', {cliente: cliente[0]});
};

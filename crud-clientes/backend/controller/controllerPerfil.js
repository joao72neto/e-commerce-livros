const { buscarClienteLogado } = require('../model/clientes/modelClientes');
const { buscarCartoesClienteId } = require('../model/clientes/modelCard');
const { buscarEnderecosClienteId } = require('../model/clientes/modelAddress');


//Página
module.exports.getPerfil = async (req, res) => {
    const cliente = await buscarClienteLogado();
    const cartoes = await buscarCartoesClienteId(cliente[0].clt_id);
    const enderecos = await buscarEnderecosClienteId(cliente[0].clt_id);

    res.render('perfil', {
        cliente: cliente[0],
        cartoes: cartoes,
        enderecos: enderecos
    });
};

const { buscarClienteLogado } = require('../model/clientes/modelClientes');
const { buscarCartoesClienteId } = require('../model/clientes/modelCard');
const { buscarEnderecosClienteId } = require('../model/clientes/modelAddress');


//Página
module.exports.getPerfil = async (req, res) => {
    const cliente = await buscarClienteLogado();
    const cartoes = await buscarCartoesClienteId(cliente[0].clt_id);
    const enderecos = await buscarEnderecosClienteId(cliente[0].clt_id);
    const retorno_pag = req.query.retorno_pag;
    const compra = req.query.compra;
    const page = req.query.page;
    const tipo = req.query.tipo;


    return res.render('perfil', {
        retorno_pag: retorno_pag,
        compra: compra,
        page: page,
        cliente: cliente[0],
        cartoes: cartoes,
        enderecos: enderecos,
        tipo: tipo
    });
};

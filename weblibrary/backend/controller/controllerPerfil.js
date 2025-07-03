const { buscarClienteLogado } = require('../model/clientes/modelClientes');
const { buscarCartoesClienteId } = require('../model/clientes/modelCard');
const { buscarEnderecosClienteId } = require('../model/clientes/modelAddress');
const { buscarRanking } = require('../model/analise/modelHistoricoVendas');

//Página
module.exports.getPerfil = async (req, res) => {
    const cliente = await buscarClienteLogado();
    const cartoes = await buscarCartoesClienteId(cliente[0].clt_id);
    const enderecos = await buscarEnderecosClienteId(cliente[0].clt_id);
    const retorno_pag = req.query.retorno_pag;
    const compra = req.query.compra;
    const page = req.query.page;
    const tipo = req.query.tipo;

    //Getting client ranking
    let ranking = await buscarRanking(cliente[0].clt_id);
    if(ranking.length < 0){
        ranking[0].position = 'Realize uma compra para calcular';
        ranking[0].total_spent = 'R$ 00,00';
    }else{
        ranking[0].total_spent = 'R$ ' + String(ranking[0].total_spent).replace('.', ',');
    }

    return res.render('perfil', {
        retorno_pag: retorno_pag,
        ranking: ranking,
        compra: compra,
        page: page,
        cliente: cliente[0],
        cartoes: cartoes,
        enderecos: enderecos,
        tipo: tipo
    });
};

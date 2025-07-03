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
    let ranking = await getRanking(cliente[0].clt_id);

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

async function getRanking(clt_id){
    const ranking = await buscarRanking(clt_id);

    if(ranking.length > 0){
        return {
            position: ranking[0].position,
            total_spent:'R$ ' + String(ranking[0].total_spent).replace('.', ',')
        }
    }

    return {
        position: 'Realize uma compra para calcular',
        total_spent: 'R$ 00,00'
    }
}

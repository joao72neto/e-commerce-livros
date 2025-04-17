const { buscarClienteLogado } = require('../../model/clientes/modelClientes');
const { buscarEnderecosClienteId } = require('../../model/clientes/modelAddress');
const { buscarCartoesClienteId } = require('../../model/clientes/modelCard');
const { buscarCarrinhoClienteId } = require('../../model/compras/modelCarrinho');
const { buscarCuponsClienteId } = require('../../model/compras/modelPagamento');

//Página
module.exports.getPagamento = async (req, res) => {

    //Obtendo dados necessários
    const cliente = await buscarClienteLogado();
    const enderecos = await buscarEnderecosClienteId(cliente[0].clt_id);
    const cartoes = await buscarCartoesClienteId(cliente[0].clt_id);
    const cupons = await buscarCuponsClienteId(cliente[0].clt_id);
    
    //Pegando os carrinho do cliente
    let carrinho = await buscarCarrinhoClienteId(cliente[0].clt_id);

    //Verificando se o cliente está comprando do carrinho ou não
    const idCompra = req.query.compra;

    if(idCompra){

        carrinho = carrinho.filter(car => car.lvr_id === Number(idCompra));

        res.render('compras/pagamento', {
            cliente: cliente,
            enderecos: enderecos,
            cartoes: cartoes,
            carrinho: carrinho,
            cupons: cupons
        }); 

        return;
    }

    res.render('compras/pagamento', {
        cliente: cliente,
        enderecos: enderecos,
        cartoes: cartoes,
        carrinho: carrinho,
        cupons: cupons
    });
};

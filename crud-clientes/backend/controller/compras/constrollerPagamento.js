const { buscarClienteLogado } = require('../../model/clientes/modelClientes');
const { buscarEnderecoClienteId } = require('../../model/clientes/modelAddress');
const { buscarCartoesClienteId } = require('../../model/clientes/modelCard');
const { buscarCarrinhoClienteId } = require('../../model/compras/modelCarrinho');

//Página
module.exports.getPagamento = async (req, res) => {
    //Obtendo dados necessários
    const cliente = await buscarClienteLogado();
    const enderecos = await buscarEnderecoClienteId(cliente[0].clt_id);
    const cartoes = await buscarCartoesClienteId(cliente[0].clt_id);
    
    //Pegando os carrinho do cliente
    const carrinho = await buscarCarrinhoClienteId(cliente[0].clt_id);

    res.render('compras/pagamento', {
        cliente: cliente,
        enderecos: enderecos,
        cartoes: cartoes,
        carrinho: carrinho
    });
};

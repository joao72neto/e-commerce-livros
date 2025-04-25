const { buscarClientesPedidos } = require('../../model/clientes/modelClientes');

//Página
module.exports.getGerenciarPedidos = async (req, res) => {

    const clientesPedidos = await buscarClientesPedidos();

    const clientes = Array.from(
        new Map(
            clientesPedidos.map(pedido => [pedido.clt_id, {
                clt_id: pedido.clt_id,
                clt_nome: pedido.clt_nome,
                clt_genero: pedido.clt_genero,
                clt_dataNasc: pedido.clt_dataNasc,
                clt_cpf: pedido.clt_cpf,
                clt_telefone: pedido.clt_telefone,
                clt_email: pedido.clt_email,
                clt_ranking: pedido.clt_ranking,
                clt_status: pedido.clt_status,
                clt_logado: pedido.clt_logado
            }])
        ).values()
    );

    res.render('analise/gerenciarPedidos', {
        clientes: clientes,
        pedidos: clientesPedidos
    });
};

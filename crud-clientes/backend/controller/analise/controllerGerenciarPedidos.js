const { buscarClientesPedidos } = require('../../model/clientes/modelClientes');
const { atualizarStatusPedidoId } = require('../../model/analise/modelGerenciarPedidos');
const { devolverTrocarProduto } = require('../../model/analise/modelGerenciarPedidos');

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


//Atualizando os status dos pedidos
module.exports.patchAtualizarStatusPedidoId = async (req, res) => {
    try{
        
        await atualizarStatusPedidoId(req.body);
        return res.status(200).json({msg: 'Status atualizdo com sucesso!'});

    }catch(err){
        console.error(`Erro no patchAtualizarStatusPedidoId - controllerGerenciarPedidos: ${err}`);
        return res.status(500).json({msg: 'Não foi possível atualizar o status'});
    }
}

//Inserção de dados
module.exports.postDevolverTrocarProduto = async (req, res) => {
    try{
        await devolverTrocarProduto(req.body);
        return res.status(201).json({msg: 'Produto em processo de troca ou devolução'});
    }catch(err){
        console.error(`Erro no postDevolverTrocarProduto - controllerGerenciarPedidos: ${err}`);
        return res.status(500).json({msg: 'Não foi possível fazer a troca do produto'});
    }
};
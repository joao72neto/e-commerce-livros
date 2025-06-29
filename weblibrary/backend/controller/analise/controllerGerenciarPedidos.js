const { buscarClientesPedidos } = require('../../model/clientes/modelClientes');
const { atualizarStatusPedidoId } = require('../../model/analise/modelGerenciarPedidos');
const { devolverTrocarProduto } = require('../../model/analise/modelGerenciarPedidos');
const { buscarDevolvidosTrocados } = require('../../model/analise/modelGerenciarPedidos');
const { deletarDevolvidoTrocado } = require('../../model/analise/modelGerenciarPedidos');
const { atualizarQtdTrocadaPedidoId } = require('../../model/analise/modelGerenciarPedidos');
const { registerLog } = require('../../model/analise/modelLogs');
const { sendNotifcation } = require('../../model/clientes/modelNotifications');

//Página
module.exports.getGerenciarPedidos = async (req, res) => {

    //Obtendo os dados
    const clientesPedidos = await buscarClientesPedidos();
    const devolvidosTrocados = await buscarDevolvidosTrocados();
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

    //Separando em itens trocados e devolvidos apenas
    const trocados = devolvidosTrocados.filter(trc => trc.trc_tipo === 'troca');
    const devolvidos = devolvidosTrocados.filter(dev => dev.trc_tipo === 'devolucao');

    return res.render('analise/gerenciarPedidos', {
        clientes: clientes,
        pedidos: clientesPedidos,
        trocados: trocados,
        devolvidos: devolvidos
    });
};

//Log model
let logData = {
    log_clt_id: '',
    log_usuario: '',
    log_operacao: '',
    log_desc: ''
}

//Atualizando os status dos pedidos
module.exports.patchAtualizarStatusPedidoId = async (req, res) => {
    try{
        
        await atualizarStatusPedidoId(req.body);

        //Registering log
        const system = req.body.system;
        logData.log_usuario = system ? 'System' : '(Admin) ';
        logData.log_operacao = 'STATUS_CHANGE';
        logData.log_desc = `Status do pedido "${req.body.ped_number}" atualizado para "${req.body.vnd_status}"`;
        await registerLog(logData);

        //Sending notifications
        await sendNotifcation(req.body);

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

        //Preparando os dados para atualizar a qtd trocada
        const dados = {
            vnd_qtd_trocada: Number(req.body.trc_qtd),
            vnd_id: Number(req.body.trc_vnd_id)
        }

        //Registering log
        logData.log_operacao = 'INSERT';
        logData.log_usuario = '';
        const type = req.body.trc_tipo;
        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
        logData.log_desc = `${capitalizedType} do pedido "${req.body.ped_number}" solicitada`;
        await registerLog(logData);
       
        await atualizarQtdTrocadaPedidoId(dados);

        return res.status(201).json({msg: 'Produto em processo de troca ou devolução'});
    }catch(err){
        console.error(`Erro no postDevolverTrocarProduto - controllerGerenciarPedidos: ${err}`);
        return res.status(500).json({msg: 'Não foi possível fazer a troca do produto'});
    }
};

//Deleção de dados
module.exports.deleteDevolvidoTrocado = async (req, res) => {
    try{
        await deletarDevolvidoTrocado(req.params.vnd_id);

        //Registering log
        logData.log_operacao = 'DELETE';
        logData.log_usuario = 'System';
        logData.log_desc = `Itens devolvidos/trocados removidos`;
        await registerLog(logData);
       
        return res.status(204).json({msg: 'Produto removido com sucesso!'});
    }catch(err){
        console.error(`Erro no deleteClienteId - controllerClientes: ${err}`);
        return res.status(500).json({msg: 'Não foi possível remover o produto devolvido ou trocado'});
    }
};
const { deletarAddressClienteId } = require("../../model/clientes/modelAddress");
const { deletarCardsClienteId } = require("../../model/clientes/modelCard");
const {buscarClienteId, buscarClientesAtivos, buscarClientesInativos, inativarCliente, ativarCliente, deletarClienteId, filtrarClientesAtivos, buscarClienteLogado, logarClienteId, deslogarCliente} = require("../../model/clientes/modelClientes");


//Páginas
module.exports.getClientes = async (req, res) => {
    const clientes = await filtrarClientesAtivos(req.query);
    return res.render('clientes/clientes', {clientes: clientes});
};

//Alterando dados
module.exports.patchLogarClienteId = async (req, res) => {
    try{
        const cliente = await logarClienteId(req.params.clt_id);

        if(cliente.length > 0){
            res.status(400).json('Já há um cliente logado no sistema');
            return;
        }

        return res.sendStatus(204);

    }catch(err){
        console.error(`Erro no patchLogarClienteId - controllerCliente: ${err}`);
        return res.sendStatus(500);
    }
};

module.exports.patchDeslogarCliente = async (req, res) => {
    try{
        await deslogarCliente();
        return res.sendStatus(204);
    }catch(err){
        console.error(`Erro no patchDeslogarCliente - controllerCliente: ${err}`);
        return res.sendStatus(500);
    }
};

module.exports.patchInativarCliente = async (req, res) => {

    try{
        await inativarCliente(req.params.clt_id);
        return res.sendStatus(204);
    }catch(err){
        console.error(`Erro no patchInativarCliente - controllerCliente: ${err}`);
        return res.sendStatus(500);
    }
};

module.exports.patchAtivarCliente = async (req, res) => {

    try{
        await ativarCliente(req.params.clt_id);
        return res.sendStatus(204)
    }catch(err){
        console.error(`Erro no patchAtivarCliente - controllerCliente: ${err}`);
        return res.sendStatus(500);
    }
    
};

//Deletando dados
module.exports.deleteClienteId = async(req, res) => {
    try{

        //Alterando os dados no banco
        await deletarAddressClienteId(req.params.clt_id);
        await deletarCardsClienteId(req.params.clt_id);
        await deletarClienteId(req.params.clt_id);

        return res.sendStatus(204);
    }catch(err){
        console.error(`Erro no deleteClienteId - controllerClientes: ${err}`);
        return res.sendStatus(500);
    }
    
};


//Apis para acessar os dados dos clientes
module.exports.getApiClienteLogado = async (req, res) => {
    const clienteLogado = await buscarClienteLogado();
    return res.json(clienteLogado);
};

module.exports.getApiClienteId = async (req, res) => {
    const cliente = await buscarClienteId(req.params.clt_id);
    return res.json(cliente);
};

module.exports.getApiClientesAtivos = async (req, res) => {
    const clientes = await buscarClientesAtivos();
    return res.json(clientes);
};

module.exports.getApiClientesInativos = async (req, res) => {
    const clientes = await buscarClientesInativos();
    return res.json(clientes);
};

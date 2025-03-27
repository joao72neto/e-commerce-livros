const {buscarClienteId, buscarClientesAtivos, buscarClientesInativos, inativarCliente, ativarCliente, deletarCliente } = require("../../model/clientes/modelClientes");

//Páginas
module.exports.getClientes = async (req, res) => {
    const clientes = await buscarClientesAtivos();
    res.render('clientes/clientes', {clientes: clientes});
};

//Alterando dados
module.exports.patchInativarCliente = async (req, res) => {

    try{
        await inativarCliente(req.params.clt_id);
        res.sendStatus(204);
    }catch(err){
        console.error(`Erro no inativarCliente - controllerCliente: ${err}`);
        res.sendStatus(500);
    }
};

module.exports.patchAtivarCliente = async (req, res) => {

    try{
        await ativarCliente(req.params.clt_id);
        res.sendStatus(204)
    }catch(err){
        console.error(`Erro no patchAtivarCliente - controllerCliente: ${err}`);
        res.sendStatus(500);
    }
    
};

//Deletando clientes
module.exports.deleteCliente = async(req, res) => {
    try{
        await deletarCliente(req.params.clt_id);
        res.sendStatus(204);
    }catch(err){
        console.error(`Erro no deleteCliente - controllerClientes: ${err}`);
        res.sendStatus(500);
    }
    
};

//Apis para acessar os dados dos clientes
module.exports.getApiClienteId = async (req, res) => {
    const cliente = await buscarClienteId(req.params.clt_id);
    res.json(cliente);
};

module.exports.getApiClientesAtivos = async (req, res) => {
    const clientes = await buscarClientesAtivos();
    res.json(clientes);
};

module.exports.getApiClientesInativos = async (req, res) => {
    const clientes = await buscarClientesInativos();
    res.json(clientes);
};


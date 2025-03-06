const {buscarClientesId, buscarClientesAtivos, buscarClientesInativos, inativarCliente, ativarCliente} = require("../model/modelClientes");

//Páginas
module.exports.getClientes = async (req, res) => {
    const clientes = await buscarClientesAtivos();
    res.render('clientes', {clientes: clientes});
};

//Alterando dados
module.exports.patchInativarCliente = async (req, res) => {

    try{
        await inativarCliente(req.params.id);
        res.sendStatus(204);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
};

module.exports.patchAtivarCliente = async (req, res) => {

    try{
        await ativarCliente(req.params.id);
        res.sendStatus(204)
    }catch(err){
        console.err(err);
        res.sendStatus(500);
    }
    
};


//Apis para acessar os dados dos clientes
module.exports.getApiClientesId = async (req, res) => {
    const cliente = await buscarClientesId(req.params.id);
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


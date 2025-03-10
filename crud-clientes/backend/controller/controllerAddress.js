const { buscarEnderecosClienteId, buscarEnderecoId, atualizarAddress, cadastrarAddress } = require("../model/modelAddress");

//Paginas
module.exports.getAddress = async (req, res) => {
    const enderecos = await buscarEnderecosClienteId(req.params.clt_id );
    res.render('address/address-main', {enderecos: enderecos});
};

module.exports.getAddressAlt = async (req, res) => {
    const enderecos = await buscarEnderecoId(req.params.end_id);
    res.render('address/address-alt', {enderecos: enderecos});
};

module.exports.getAddressAdd = async (req, res) => {
    const enderecos = await buscarEnderecoId(req.params.end_id);
    res.render('address/address-add', {enderecos: enderecos});
};


//Alteração de dados
module.exports.putAddressAlt = async (req, res) => {
    const endereco = await atualizarAddress(req.body, req.params.end_id);
    res.json(endereco);
};

//Inserção de dados
module.exports.postAddressAdd = async (req, res) => {
    try{
        await cadastrarAddress(req.body);
        res.sendStatus(200);
    }catch(err){
        console.err(`Erro: ${err}`);
        res.sendStatus(500);
    }
};

//Apis para acessar os dados do banco
module.exports.getApiEnderecoId = async(req, res) => {
    const endereco = await buscarEnderecoId(req.params.end_id);
    res.json(endereco);
};
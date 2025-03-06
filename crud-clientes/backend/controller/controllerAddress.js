const { buscarEnderecosClienteId, buscarEnderecoId } = require("../model/modelAddress");

//Paginas
module.exports.getAddress = async (req, res) => {
    const enderecos = await buscarEnderecosClienteId(req.params.id);
    res.render('address/address-main', {enderecos: enderecos});
};

module.exports.getAddressAlt = async (req, res) => {
    const enderecos = await buscarEnderecosClienteId(req.params.id);
    res.render('address/address-alt', {enderecos: enderecos});
};

module.exports.getAddressAdd = async (req, res) => {
    const enderecos = await buscarEnderecosClienteId(req.params.id);
    res.render('address/address-add', {enderecos: enderecos});
};

//Apis para acessar os dados do banco
module.exports.getApiEnderecoId = async(req, res) => {
    const endereco = await buscarEnderecoId(req.params.id);
    res.json(endereco);
};
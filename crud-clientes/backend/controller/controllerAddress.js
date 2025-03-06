const { buscarTodosEnderecos, buscarEnderecosClienteId } = require("../model/modelAddress");

//Telas
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

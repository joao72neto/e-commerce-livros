const { buscarTodosEnderecos } = require("../model/modelAddress");

module.exports.getAddress = async (req, res) => {
    const enderecos = await buscarTodosEnderecos();
    res.render('address/address-main', {enderecos: enderecos});
};

module.exports.getAddressAlt = (req, res) => {
    res.render('address/address-alt');
};

module.exports.getAddressAdd = (req, res) => {
    res.render('address/address-add');
};
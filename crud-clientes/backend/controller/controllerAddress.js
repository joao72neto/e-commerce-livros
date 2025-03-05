const { buscarTodosEnderecos, buscarEnderecosClienteId } = require("../model/modelAddress");

//Telas
module.exports.getAddress = async (req, res) => {
    const enderecos = await buscarEnderecosClienteId(req.params.id);
    res.render('address/address-main', {enderecos: enderecos});
};

module.exports.getAddressAlt = (req, res) => {
    res.render('address/address-alt');
};

module.exports.getAddressAdd = (req, res) => {
    res.render('address/address-add');
};


// //Apis
// module.exports.getApiEnderecosClienteId = async (req, res) =>{
//     const enderecos = await buscarEnderecosClienteId(req.params.id);
//     res.json(enderecos);
// }
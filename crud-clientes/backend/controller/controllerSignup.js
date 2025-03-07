const { cadastrarAddress } = require("../model/modelAddress");
const { cadastrarCartao } = require("../model/modelCard");
const { cadastrarCliente } = require("../model/modelClientes");

//Páginas
module.exports.getSignup = (req, res) => {
    res.render('signup');
};

//Inserindo dados no banco
module.exports.postSignup = async (req, res) => {
    try{

        await cadastrarCliente(req.body.cliente);
        await cadastrarCartao(req.body.card);
        await cadastrarAddress(req.body.address)
        
        res.sendStatus(200);
    }catch(err){
        console.error(`Erro: ${err}`);
        res.sendStatus(500);

    }
};

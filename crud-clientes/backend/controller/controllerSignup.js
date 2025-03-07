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

        const clt_id = await cadastrarCliente(req.body.cliente);

        req.body.card.car_clt_id = clt_id;
        req.body.address.end_clt_id = clt_id;

        await cadastrarCartao(req.body.card);
        await cadastrarAddress(req.body.address);
        
        res.sendStatus(200);
    }catch(err){
        console.error(`Erro: ${err}`);
        res.sendStatus(500);

    }
};

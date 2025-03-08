const { cadastrarAddress, buscarEnderecosClienteId, atualizarAddress } = require("../model/modelAddress");
const { cadastrarCartao, buscarCartoesClienteId, atualizarCard} = require("../model/modelCard");
const { cadastrarCliente, buscarClienteId, atualizarCliente } = require("../model/modelClientes");

//Páginas
module.exports.getSignup = (req, res) => {
    res.render('signup/signup');
};

module.exports.getSignupAlt = async (req, res) =>{
    const cliente = await buscarClienteId(req.params.clt_id);
    const enderecos = await buscarEnderecosClienteId(req.params.clt_id);
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);

    res.render('signup/signup-alt', {
        cliente: cliente,
        enderecos: enderecos,
        cartoes: cartoes
    })
};

//Atualizando os dados do banco
module.exports.putSignupAlt = async (req, res) => {

    try{
        await atualizarAddress(req.body.address, req.body.address.end_id);
        await atualizarCard(req.body.card, req.body.card.car_id);
        await atualizarCliente(req.body.cliente, req.params.clt_id);
        
        res.sendStatus(200);
    }catch(err){
        console.error(`Erro: ${err}`);
        res.sendStatus(500);
    }

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

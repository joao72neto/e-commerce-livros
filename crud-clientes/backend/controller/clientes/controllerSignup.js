const { cadastrarAddress, buscarEnderecosClienteId, atualizarAddress } = require("../../model/clientes/modelAddress");
const { cadastrarCartao, buscarCartoesClienteId, atualizarCard} = require("../../model/clientes/modelCard");
const { cadastrarCliente, buscarClienteId, atualizarCliente } = require("../../model/clientes/modelClientes");

//Páginas
module.exports.getSignup = (req, res) => {
    const retorno = req.query.retorno;
    res.render('clientes/signup/signup', {
        retorno: retorno
    });
};

module.exports.getSignupAlt = async (req, res) =>{
    const cliente = await buscarClienteId(req.params.clt_id);
    const enderecos = await buscarEnderecosClienteId(req.params.clt_id);
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);
    const retorno = req.query.retorno;

    res.render('clientes/signup/signup-alt', {
        cliente: cliente,
        enderecos: enderecos,
        cartoes: cartoes,
        retorno: retorno
    });
};

//Atualizando os dados do banco
module.exports.putSignupAlt = async (req, res) => {

    try{
        await atualizarAddress(req.body.address, req.body.address.end_id);
        await atualizarCard(req.body.card, req.body.card.car_id);
        await atualizarCliente(req.body.cliente, req.params.clt_id);
        
        res.sendStatus(200);
    }catch(err){
        console.error(`Erro no putSignupAlt - controllerSignup: ${err}`);
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
        console.error(`Erro no postSignup - controllerSignup: ${err}`);
        res.sendStatus(500);

    }
};

const { cadastrarAddress, buscarEnderecosClienteId, atualizarAddress } = require("../../model/clientes/modelAddress");
const { cadastrarCartao, buscarCartoesClienteId, atualizarCard} = require("../../model/clientes/modelCard");
const { cadastrarCliente, buscarClienteId, atualizarCliente } = require("../../model/clientes/modelClientes");
const { calcularFreteFicticio } = require('../../model/compras/modelPagamento');
const { registerLog } = require('../../model/analise/modelLogs');

//Páginas
module.exports.getSignup = (req, res) => {
    const retorno = req.query.retorno;
    return res.render('clientes/signup/signup', {
        retorno: retorno
    });
};

module.exports.getSignupAlt = async (req, res) =>{
    const cliente = await buscarClienteId(req.params.clt_id);
    const enderecos = await buscarEnderecosClienteId(req.params.clt_id);
    const cartoes = await buscarCartoesClienteId(req.params.clt_id);
    const retorno = req.query.retorno;

    return res.render('clientes/signup/signup-alt', {
        cliente: cliente,
        enderecos: enderecos,
        cartoes: cartoes,
        retorno: retorno
    });
};

//Log model
let logData = {
    log_clt_id: '',
    log_usuario: '',
    log_operacao: '',
    log_desc: ''
}

//Atualizando os dados do banco
module.exports.putSignupAlt = async (req, res) => {

    try{

        //Atualizando os dados no banco
        await atualizarAddress(req.body.address, req.body.address.end_id);
        await atualizarCard(req.body.card, req.body.card.car_id);
        await atualizarCliente(req.body.cliente, req.params.clt_id);
        
        //Registering log
        const client = await buscarClienteId(req.params.clt_id);
        const userName = client[0].clt_nome;
        logData.log_usuario = req.body.user.user_type;
        logData.log_operacao = 'UPDATE';
        logData.log_desc = `Cliente "${userName}" foi alterado(a)`;
        await registerLog(logData);

        return res.sendStatus(200);
    }catch(err){
        console.error(`Erro no putSignupAlt - controllerSignup: ${err}`);
        return res.sendStatus(500);
    }

};


//Inserindo dados no banco
module.exports.postSignup = async (req, res) => {
    try{

        //Cadastrando o cliente no banco de dados
        const clt_id = await cadastrarCliente(req.body.cliente);

        //Associando a chave primária do cliente
        req.body.card.car_clt_id = clt_id;
        req.body.address.end_clt_id = clt_id;

        //Calculando o frete
        const cep = req.body.address.end_cep;
        req.body.address.end_frete = calcularFreteFicticio(cep);

        //Cadastrando os cartão e o endereço no banco
        await cadastrarCartao(req.body.card);
        await cadastrarAddress(req.body.address);

        //Registering log
        const client = await buscarClienteId(clt_id);
        const userName = client[0].clt_nome;
        logData.log_usuario = req.body.user.user_type;
        logData.log_operacao = 'INSERT';
        logData.log_desc = `Cliente "${userName}" foi cadastrado(a)`;
        await registerLog(logData);
        
        return res.sendStatus(200);
    }catch(err){
        console.error(`Erro no postSignup - controllerSignup: ${err}`);
        return res.sendStatus(500);

    }
};

const { buscarEnderecosClienteId, buscarEnderecoId, atualizarAddress, cadastrarAddress, deletarAddressId } = require("../../model/clientes/modelAddress");
const { desativarEnderecosClienteId } = require('../../model/clientes/modelAddress');
const { calcularFreteFicticio } = require('../../model/compras/modelPagamento');

//Paginas
module.exports.getAddress = async (req, res) => {
    const enderecos = await buscarEnderecosClienteId(req.params.clt_id );
    return res.render('clientes/address/address-main', {enderecos: enderecos});
};

module.exports.getAddressAlt = async (req, res) => {
    const retorno = req.query.retorno;
    const enderecos = await buscarEnderecoId(req.params.end_id);
    const retorno_pag = req.query.retorno_pag;
    const tipo = req.query.tipo;

    return res.render('clientes/address/address-alt', {
        enderecos: enderecos,
        retorno: retorno,
        retorno_pag: retorno_pag, 
        tipo: tipo
    });
};

module.exports.getAddressAdd = async (req, res) => {
    const retorno = req.query.retorno;
    const enderecos = await buscarEnderecosClienteId(req.params.clt_id);
    const retorno_pag = req.query.retorno_pag;
    const tipo = req.query.tipo;

    return res.render('clientes/address/address-add', {
        enderecos: enderecos,
        retorno: retorno,
        retorno_pag: retorno_pag, 
        tipo: tipo
    });
};


//Alteração de dados
module.exports.putAddressAlt = async (req, res) => {
    const endereco = await atualizarAddress(req.body, req.params.end_id);
    return res.json(endereco);
};

module.exports.patchDesativarEnderecosClienteId = async (req, res) => {
    try{
        
        await desativarEnderecosClienteId(req.params.clt_id);
        return res.status(200).json({msg: 'Endereço desativado com sucesso!'});

    }catch(err){
        console.error(`Erro no patchDesativarEnderecosClienteId - controllerAddress: ${err}`);
        return res.status(500).json({msg: 'Não foi possível desativar o endereço'});
    }
};


//Inserção de dados
module.exports.postAddressAdd = async (req, res) => {
    try{
        
        //Calculando o frete para o endereço com base no cep
        let dados = req.body;
        dados.end_frete = calcularFreteFicticio(dados.end_cep);

        //Cadastrando o novo endereço
        await cadastrarAddress(dados);
        return res.sendStatus(200);
        
    }catch(err){
        console.err(`Erro no postAddressAdd - controllerAddress: ${err}`);
        return res.sendStatus(500);
    }
};

//Deletando dados
module.exports.deleteAddressId = async (req, res) => {
    try {
        const enderecos = await buscarEnderecosClienteId(req.params.clt_id);

        if (enderecos.length <= 1) {
            return res.status(400).json({ msg: "O cliente deve ter pelo menos um endereço cadastrado." });
        }

        await deletarAddressId(req.params.end_id);
        return res.sendStatus(204);
    } catch (err) {
        console.error(`Erro no deleteAddressId - controllerAddress: ${err}`);
        return res.sendStatus(500);
    }
};


//Apis para acessar os dados do banco
module.exports.getApiEnderecoId = async(req, res) => {
    const endereco = await buscarEnderecoId(req.params.end_id);
    return res.json(endereco);
};
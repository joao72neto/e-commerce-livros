const { buscarEnderecosClienteId, buscarEnderecoId, atualizarAddress, cadastrarAddress, deletarAddressId, deletarAddressClienteId } = require("../../model/clientes/modelAddress");

//Função que gera um frete fictício com base no cep
function calcularFreteFicticio(cep) {

    // Removendo tudo que não é número
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        return null;
    }

    // Pegando os dois primeiro dígitos do cep
    const faixa = parseInt(cepLimpo.substring(0, 2));

    //Função que gera um valor aleatório de frete dentro de uma faixa
    const gerarValorAleatorio = (min, max) => {
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    };

    // Regra fictícia baseada na "distância"
    if (faixa <= 20) return gerarValorAleatorio(8.50, 13.00);      
    if (faixa <= 50) return gerarValorAleatorio(13.01, 20.00);   
    if (faixa <= 80) return gerarValorAleatorio(20.01, 30.00); 
    return gerarValorAleatorio(30.01, 45.00);                    
}

//Paginas
module.exports.getAddress = async (req, res) => {
    const enderecos = await buscarEnderecosClienteId(req.params.clt_id );
    res.render('clientes/address/address-main', {enderecos: enderecos});
};

module.exports.getAddressAlt = async (req, res) => {
    const retorno = req.query.retorno;
    const enderecos = await buscarEnderecoId(req.params.end_id);
    const retorno_pag = req.query.retorno_pag;
    const tipo = req.query.tipo;

    res.render('clientes/address/address-alt', {
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

    res.render('clientes/address/address-add', {
        enderecos: enderecos,
        retorno: retorno,
        retorno_pag: retorno_pag, 
        tipo: tipo
    });
};


//Alteração de dados
module.exports.putAddressAlt = async (req, res) => {
    const endereco = await atualizarAddress(req.body, req.params.end_id);
    res.json(endereco);
};

//Inserção de dados
module.exports.postAddressAdd = async (req, res) => {
    try{
        
        //Calculando o frete para o endereço com base no cep
        let dados = req.body;
        dados.end_frete = calcularFreteFicticio(dados.end_cep);

        //Cadastrando o novo endereço
        await cadastrarAddress(dados);
        res.sendStatus(200);
        
    }catch(err){
        console.err(`Erro no postAddressAdd - controllerAddress: ${err}`);
        res.sendStatus(500);
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
        res.sendStatus(204);
    } catch (err) {
        console.error(`Erro no deleteAddressId - controllerAddress: ${err}`);
        res.sendStatus(500);
    }
};


//Apis para acessar os dados do banco
module.exports.getApiEnderecoId = async(req, res) => {
    const endereco = await buscarEnderecoId(req.params.end_id);
    res.json(endereco);
};
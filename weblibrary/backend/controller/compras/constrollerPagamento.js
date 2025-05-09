const { buscarClienteLogado } = require('../../model/clientes/modelClientes');
const { buscarEnderecosClienteId } = require('../../model/clientes/modelAddress');
const { buscarCarrinhoClienteId } = require('../../model/compras/modelCarrinho');
const { deletarCupomId } = require('../../model/compras/modelPagamento');
const { inativarCupom } = require('../../model/compras/modelPagamento');
const { ativarCupom } = require('../../model/compras/modelPagamento');
const { buscarCuponsInativosClienteId } = require('../../model/compras/modelPagamento');
const { buscarCuponsAtivosClienteId } = require('../../model/compras/modelPagamento');
const { adicionarCupom } = require('../../model/compras/modelPagamento');
const { atualizarCardIdStatus } = require('../../model/clientes/modelCard');
const { buscarCartoesAtivosClienteId } = require('../../model/clientes/modelCard');
const { buscarCartoesInativosClienteId } = require('../../model/clientes/modelCard');
const { buscarEnderecosInativosClienteId } = require('../../model/clientes/modelAddress');
const { buscarEnderecosAtivosClienteId } = require('../../model/clientes/modelAddress');
const { atualizarEnderecoIdStatus } = require('../../model/clientes/modelAddress');

//Página
module.exports.getPagamento = async (req, res) => {

    //Obtendo dados necessários
    const cliente = await buscarClienteLogado();
    const enderecos = await buscarEnderecosClienteId(cliente[0].clt_id);
    const cuponsInativos = await buscarCuponsInativosClienteId(cliente[0].clt_id);
    const cuponsAtivos = await buscarCuponsAtivosClienteId(cliente[0].clt_id);

    //Pegando os carrinho do cliente
    let carrinho = await buscarCarrinhoClienteId(cliente[0].clt_id);

    //Verificando se o cliente está comprando do carrinho ou não
    const idCompra = req.query.compra;

    //Obtendo o id do cartão que o cliente quer adicionar
    const car_id = req.query.car_id;
    const cartoesAtivos = await buscarCartoesAtivosClienteId(cliente[0].clt_id);
    const cartoesInativos = await buscarCartoesInativosClienteId(cliente[0].clt_id);

    //Obtendo o id do endereço
    const end_id = req.query.end_id;
    const enderecosAtivos = await buscarEnderecosAtivosClienteId(cliente[0].clt_id);
    const enderecosInativos = await buscarEnderecosInativosClienteId(cliente[0].clt_id);

    //Atualizando o status do cartão
    if(car_id){
        try{
            await atualizarCardIdStatus(car_id);
        }catch(err){
            console.error(`Erro no atualizarCardIdStatus - controllerPagamento: ${err}`);
            throw err;
        }
    }

    //Atualizando o status do endereço
    if(end_id){
        try{
            await atualizarEnderecoIdStatus(end_id);
        }catch(err){
            console.error(`Erro no atualizarEnderecoIdStatus - controllerPagamento: ${err}`);
            throw err;
        }
    }   


    if(idCompra){

        carrinho = carrinho.filter(car => car.lvr_id === Number(idCompra));

        res.render('compras/pagamento', {
            cliente: cliente,
            enderecosAtivos: enderecosAtivos,
            enderecosInativos: enderecosInativos,
            cartoesInativos: cartoesInativos,
            cartoesAtivos: cartoesAtivos,
            carrinho: carrinho,
            cuponsInativos: cuponsInativos,
            cuponsAtivos: cuponsAtivos
        }); 

        return;
    }

    res.render('compras/pagamento', {
        cliente: cliente,
        enderecos: enderecos,
        cartoesInativos: cartoesInativos,
        cartoesAtivos: cartoesAtivos,
        carrinho: carrinho,
        cuponsInativos: cuponsInativos,
        cuponsAtivos: cuponsAtivos
    });
};

//APIs
module.exports.getApiCuponsAtivosClienteId = async (req, res) => {
    const cupons = await buscarCuponsAtivosClienteId(req.params.clt_id);
    res.json(cupons);
};

module.exports.getApiCuponsInativosClienteId = async (req, res) => {
    const cupons = await buscarCuponsInativosClienteId(req.params.clt_id); 
    res.json(cupons);
};

//Deletando um cupom 
module.exports.deleteCupomId = async (req, res) => {
    try{
    
        await deletarCupomId(req.params.cup_id);
        res.status(204).json({msg: 'Cupom removido com sucesso'});

    }catch(err){
        console.error(`Erro no deleteCupomId - controllerPagamento: ${err}`);
        res.status(500).json({msg:'Erro ao remover o cupom'});
    }
};


//Atualizando os dados do cupom
module.exports.patchAtivarCupom = async (req, res) => {

    try{
        await ativarCupom(req.params.cup_id);
        res.sendStatus(200)
    }catch(err){
        console.error(`Erro no patchAtivarCupom - controllerPagamento: ${err}`);
        res.sendStatus(500);
    }
};

module.exports.patchInativarCupom = async (req, res) => {
    try{
        await inativarCupom(req.params.cup_id);
        res.sendStatus(200)
    }catch(err){
        console.error(`Erro no patchInativarCupom - controllerPagamento: ${err}`);
        res.sendStatus(500);
    }
};

//Inserindo dados
module.exports.postAdicionarCupons = async (req, res) => {
    try{

        await adicionarCupom(req.body);
        res.status(201).json({msg: 'Cupom adicionado com sucesso!'})

    }catch(err){
        console.error(`Erro no postAdicionarCupons - controllerPagamento: ${err}`);
        res.status(500).json({msg:'Não foi possível adicionar o cupom'});

    }
};


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


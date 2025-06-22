const { buscarClienteLogado } = require('../../model/clientes/modelClientes');
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

    //Obtendo dados necessários para o pagamento
    const cliente = await buscarClienteLogado();
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
    const enderecosAtivo = await buscarEnderecosAtivosClienteId(cliente[0].clt_id);
    const enderecosInativos = await buscarEnderecosInativosClienteId(cliente[0].clt_id);

    //Getting the returing page
    const page = req.query.page;

    //Obtendo o frete do endereço específico
    let frete;
    if(enderecosAtivo.length !== 0){
        frete = Number(enderecosAtivo[0].end_frete);
    }

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

        return res.render('compras/pagamento', {
            cliente: cliente,
            enderecosAtivo: enderecosAtivo,
            enderecosInativos: enderecosInativos,
            cartoesInativos: cartoesInativos,
            cartoesAtivos: cartoesAtivos,
            carrinho: carrinho,
            cuponsInativos: cuponsInativos,
            cuponsAtivos: cuponsAtivos, 
            frete: frete?frete:0,
            page: ''
        }); 
    }

    return res.render('compras/pagamento', {
        cliente: cliente,
        enderecosAtivo: enderecosAtivo,
        enderecosInativos: enderecosInativos,
        cartoesInativos: cartoesInativos,
        cartoesAtivos: cartoesAtivos,
        carrinho: carrinho,
        cuponsInativos: cuponsInativos,
        cuponsAtivos: cuponsAtivos,
        frete: frete?frete:0,
        page: page
    });
};

//APIs
module.exports.getApiCuponsAtivosClienteId = async (req, res) => {
    const cupons = await buscarCuponsAtivosClienteId(req.params.clt_id);
    return res.json(cupons);
};

module.exports.getApiCuponsInativosClienteId = async (req, res) => {
    const cupons = await buscarCuponsInativosClienteId(req.params.clt_id); 
    return res.json(cupons);
};

//Deletando um cupom 
module.exports.deleteCupomId = async (req, res) => {
    try{
    
        await deletarCupomId(req.params.cup_id);
        return res.status(204).json({msg: 'Cupom removido com sucesso'});

    }catch(err){
        console.error(`Erro no deleteCupomId - controllerPagamento: ${err}`);
        return res.status(500).json({msg:'Erro ao remover o cupom'});
    }
};


//Atualizando os dados do cupom
module.exports.patchAtivarCupom = async (req, res) => {

    try{
        await ativarCupom(req.params.cup_id);
        return res.sendStatus(200)
    }catch(err){
        console.error(`Erro no patchAtivarCupom - controllerPagamento: ${err}`);
        return res.sendStatus(500);
    }
};

module.exports.patchInativarCupom = async (req, res) => {
    try{
        await inativarCupom(req.params.cup_id);
        return res.sendStatus(200)
    }catch(err){
        console.error(`Erro no patchInativarCupom - controllerPagamento: ${err}`);
        return res.sendStatus(500);
    }
};

//Inserindo dados
module.exports.postAdicionarCupons = async (req, res) => {
    try{

        await adicionarCupom(req.body);
        return res.status(201).json({msg: 'Cupom adicionado com sucesso!'})

    }catch(err){
        console.error(`Erro no postAdicionarCupons - controllerPagamento: ${err}`);
        return res.status(500).json({msg:'Não foi possível adicionar o cupom'});

    }
};

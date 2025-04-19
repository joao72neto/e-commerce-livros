const { buscarClienteLogado } = require('../../model/clientes/modelClientes');
const { buscarEnderecosClienteId } = require('../../model/clientes/modelAddress');
const { buscarCartoesClienteId } = require('../../model/clientes/modelCard');
const { buscarCarrinhoClienteId } = require('../../model/compras/modelCarrinho');
const { deletarCupomId } = require('../../model/compras/modelPagamento');
const { inativarCupom } = require('../../model/compras/modelPagamento');
const { ativarCupom } = require('../../model/compras/modelPagamento');
const { buscarCuponsInativosClienteId } = require('../../model/compras/modelPagamento');
const { buscarCuponsAtivosClienteId } = require('../../model/compras/modelPagamento');
//Página
module.exports.getPagamento = async (req, res) => {

    //Obtendo dados necessários
    const cliente = await buscarClienteLogado();
    const enderecos = await buscarEnderecosClienteId(cliente[0].clt_id);
    const cartoes = await buscarCartoesClienteId(cliente[0].clt_id);
    const cuponsInativos = await buscarCuponsInativosClienteId(cliente[0].clt_id);
    const cuponsAtivos = await buscarCuponsAtivosClienteId(cliente[0].clt_id);

    //Pegando os carrinho do cliente
    let carrinho = await buscarCarrinhoClienteId(cliente[0].clt_id);

    //Verificando se o cliente está comprando do carrinho ou não
    const idCompra = req.query.compra;

    if(idCompra){

        carrinho = carrinho.filter(car => car.lvr_id === Number(idCompra));

        res.render('compras/pagamento', {
            cliente: cliente,
            enderecos: enderecos,
            cartoes: cartoes,
            carrinho: carrinho,
            cuponsInativos: cuponsInativos,
            cuponsAtivos: cuponsAtivos
        }); 

        return;
    }

    res.render('compras/pagamento', {
        cliente: cliente,
        enderecos: enderecos,
        cartoes: cartoes,
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
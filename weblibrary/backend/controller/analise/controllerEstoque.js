const { buscarEstoque } = require('../../model/analise/modelEstoque');
const { adicionarEstoque } = require('../../model/analise/modelEstoque');
const { buscarTodosFornecedores } = require('../../model/analise/modelEstoque');
const { buscarTodosGrpPrecificacao } = require('../../model/analise/modelEstoque');
const { buscarTodosLivros } = require('../../model/books/modelBooks');
const { buscarDevolvidosTrocados } = require('../../model/analise/modelGerenciarPedidos');
const { buscarPedidosClienteId } = require('../../model/compras/modelPedidos');


//Página
module.exports.getEstoque = async (req, res) => {
    const estoque = await buscarEstoque();
    return res.render('analise/estoque/estoque', {estoque: estoque});
};

module.exports.getEstoqueEntrada = async (req, res) => {
    
    //Obtendo dados
    const fornecedores = await buscarTodosFornecedores();
    const grpPrecificacao = await buscarTodosGrpPrecificacao();
    const livros = await buscarTodosLivros(); 
    const estoque = await buscarEstoque();
    const trocas = await buscarDevolvidosTrocados();
    const query = req.query;

    if(Object.keys(query).length !== 0){

        //Buscando o número do pedido
        const pedidos = await buscarPedidosClienteId(req.query.clt_id);
        const pedido = pedidos.find(ped => ped.vnd_clt_id == req.query.clt_id && ped.vnd_lvr_id == req.query.lvr_id);

        //Pegando dados para o retorno do estoque
        const estoqueFiltrado = estoque.find(est => est.lvr_id == req.query.lvr_id);
        const troca = trocas.find(trc => trc.trc_id == req.query.trc_id);
        const livro = livros.find(lvr => lvr.lvr_id == req.query.lvr_id);
        const fornecedor = fornecedores.find(f => f.for_id == estoqueFiltrado.for_id);
        const grpPre = grpPrecificacao.find(grp => grp.gpp_id == estoqueFiltrado.gpp_id);

        //Renderizando a página de retorno de item ao estoque
        return res.render('analise/estoque/estoqueEntrada', {
            livros: livros,
            livro: livro,
            fornecedor: fornecedor,
            grpPre: grpPre,
            troca: troca,
            fornecedores: fornecedores,
            grpPrecificacao: grpPrecificacao,
            query: query,
            estoque: estoque,
            pedido: pedido
    
        });
    }

    //Renderizando a página de entrada de item para o estoque
    return res.render('analise/estoque/estoqueEntrada', {
        livros: livros,
        livro: '',
        fornecedor: '',
        grpPre: '',
        troca: '',
        fornecedores: fornecedores,
        grpPrecificacao: grpPrecificacao,
        query: query,
        estoque: estoque,
        pedido: ''
    });
};

//Inserção de dados
module.exports.postAdicionarEstoque = async (req, res) => {
    try{
        await adicionarEstoque(req.body);
        return res.status(201).json({msg: 'Nova entrada adicionada ao estoque'});
    }catch(err){
        console.error(`Erro no postAdicionarEstoque - controllerEstoque: ${err}`);
        return res.status(500).json({msg:'Erro adicionar item ao estoque'});
    }
};

//Apis 
module.exports.getApiTodosFornecedores = async (req, res) => {
    const fornecedores = await buscarTodosFornecedores();
    return res.json(fornecedores); 
};

module.exports.getApiTodosGrpPrecificacao = async (req, res) => {
    const grpPrecificacao = await buscarTodosGrpPrecificacao();
    return res.json(grpPrecificacao);
};

const { buscarEstoque } = require('../../model/analise/modelEstoque');
const { adicionarEstoque } = require('../../model/analise/modelEstoque');
const { buscarTodosFornecedores } = require('../../model/analise/modelEstoque');
const { buscarTodosGrpPrecificacao } = require('../../model/analise/modelEstoque');

//Página
module.exports.getEstoque = async (req, res) => {

    const estoque = await buscarEstoque();
    res.render('analise/estoque/estoque', {estoque: estoque});
};

module.exports.getEstoqueEntrada = (req, res) => {
    res.render('analise/estoque/estoqueEntrada');
};

//Inserção de dados
module.exports.postAdicionarEstoque = async (req, res) => {
    try{
        await adicionarEstoque(req.body);
        res.status(201).json({msg: 'Nova entrada adicionada ao estoque'});
    }catch(err){
        console.error(`Erro no postAdicionarEstoque - controllerEstoque: ${err}`);
        return res.status(500).json({msg:'Erro adicionar item ao estoque'});
    }
};

//Apis 
module.exports.getApiTodosFornecedores = async (req, res) => {
    const fornecedores = await buscarTodosFornecedores();
    res.json(fornecedores); 
};

module.exports.getApiTodosGrpPrecificacao = async (req, res) => {
    const grpPrecificacao = await buscarTodosGrpPrecificacao();
    res.json(grpPrecificacao);
};

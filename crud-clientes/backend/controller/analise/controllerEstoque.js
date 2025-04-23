const { buscarEstoque } = require('../../model/analise/modelEstoque');

//Página
module.exports.getEstoque = async (req, res) => {

    const estoque = await buscarEstoque();
    res.render('analise/estoque/estoque', {estoque: estoque});
};

module.exports.getEstoqueEntrada = (req, res) => {
    res.render('analise/estoque/estoqueEntrada');
};


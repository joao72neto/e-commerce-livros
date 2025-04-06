const { buscarTodosLivro } = require('../model/modelIndex');

//Página
module.exports.getIndex = async (req, res) => {
    const livros = await buscarTodosLivro();
    res.render('index/index', {livros: livros});
};

module.exports.getIndexLogado = (req, res) => {
    res.render('index/indexLogado');
};


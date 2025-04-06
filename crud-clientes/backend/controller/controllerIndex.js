const { buscarTodosLivro } = require('../model/modelIndex');

//Página
module.exports.getIndex = async (req, res) => {
    const livros = await buscarTodosLivro();
    res.render('index/index', {livros: livros});
};

module.exports.getIndexHome = async (req, res) => {
    const livros = await buscarTodosLivro();
    res.render('index/indexHome', {livros: livros});
};


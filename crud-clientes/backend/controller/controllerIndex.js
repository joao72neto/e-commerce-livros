const { buscarTodosLivro } = require('../model/modelIndex');

//Página
module.exports.getIndex = async (req, res) => {
    const livros = await buscarTodosLivro();
    res.render('index', {livros: livros});
};



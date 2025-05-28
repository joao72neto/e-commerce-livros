const { buscarTodosLivros } = require('../../model/books/modelBooks');

//APIs 
module.exports.getBuscarTodosLivros = async (req, res) => {
    const livros = await buscarTodosLivros();
    return res.json(livros);
}
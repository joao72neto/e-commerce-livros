const { buscarLivroId } = require('../../model/books/modelBooks');

//Página
module.exports.getProduto = async (req, res) => {
    const livro = await buscarLivroId(req.params.lvr_id);
    return res.render('compras/produto', {
        livro: livro[0]
    });
};

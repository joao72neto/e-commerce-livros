const { buscarLivroId } = require('../../model/books/modelBooks');
const { buscarCategoriasLivroId } = require('../../model/books/modelBooks');
const { buscarClienteLogado } = require('../../model/clientes/modelClientes'); 
const { buscarLivrosIdQtdEstoque } = require('../../model/analise/modelEstoque');

//Página
module.exports.getProduto = async (req, res) => {
    const livro = await buscarLivroId(req.params.lvr_id);
    const livroQtdEstoque = await buscarLivrosIdQtdEstoque(req.params.lvr_id);
    const clienteLogado = await buscarClienteLogado();
    const categorias = await buscarCategoriasLivroId(req.params.lvr_id);

    return res.render('compras/produto', {
        livro: livro[0],
        livroQtdEstoque: livroQtdEstoque[0],
        cliente: clienteLogado,
        categorias: categorias
    });
};

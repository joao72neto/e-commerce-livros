const { buscarLivroId } = require('../../model/books/modelBooks');
const {buscarClienteLogado } = require('../../model/clientes/modelClientes'); 

//Página
module.exports.getProduto = async (req, res) => {
    const livro = await buscarLivroId(req.params.lvr_id);
    const clienteLogado = await buscarClienteLogado();

    return res.render('compras/produto', {
        livro: livro[0],
        cliente: clienteLogado
    });
};

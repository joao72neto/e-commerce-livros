const { buscarClienteLogado } = require('../model/clientes/modelClientes');
const { buscarTodosLivro } = require('../model/modelIndex');

//Página
module.exports.getIndex = async (req, res) => {
    const livros = await buscarTodosLivro();
    const clienteLogado = await buscarClienteLogado();

    if(clienteLogado.length > 0){
        res.render('index/indexLogado', {
            livros: livros, 
            cliente: clienteLogado
        });
        return;
    }

    res.render('index/index', {livros: livros});
};


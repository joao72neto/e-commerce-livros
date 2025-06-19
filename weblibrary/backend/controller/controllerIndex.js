const { buscarClienteLogado } = require('../model/clientes/modelClientes');
const { buscarLivrosIndex } = require('../model/books/modelBooks');

//Página
module.exports.getIndex = async (req, res) => {
    const livros = await buscarLivrosIndex();
    const cliente = await buscarClienteLogado();

    if(cliente.length > 0){
        return res.render('index/indexLogado', {
            livros: livros, 
            cliente: cliente
        });
    }

    return res.render('index/index', {livros: livros});
};

//Resetar histórico IA
const BOOT_TIMESTAMP = Date.now();

module.exports.getServerVersion = (req, res) => {
    res.send(String(BOOT_TIMESTAMP));
}


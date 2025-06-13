const { buscarCategoriasVendidas } = require('../../model/analise/modelHistoricoVendas');
const { buscarLivrosVendidos } = require('../../model/analise/modelHistoricoVendas');

//Página
module.exports.getHistoricoVendas = async (req, res) => {
    
    //Obtendo os dados
    const livros = await buscarLivrosVendidos();
    const categorias = await buscarCategoriasVendidas();
    
    //Renderizando a página
    return res.render('analise/historicoVendas', {
        categorias: categorias,
        livros: livros
    });
};

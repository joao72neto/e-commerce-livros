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

//Apis
module.exports.getApiLivrosVendidos = async (req, res) => {
    let livros = await buscarLivrosVendidos();

    //Formatando a data
    livros = livros.map(livro => {
        const data = new Date(livro.data_venda).toISOString().split('T')[0];
        return{
            ...livro, 
            data_venda: data
        }
    });

    //Retornando dados json
    res.json(livros);
}

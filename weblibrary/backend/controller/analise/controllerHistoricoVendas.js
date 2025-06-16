const { buscarCategoriasVendidas } = require('../../model/analise/modelHistoricoVendas');
const { buscarLivrosVendidos } = require('../../model/analise/modelHistoricoVendas');

//Página
module.exports.getHistoricoVendas = async (req, res) => {
    
    //Obtendo as categorias
    const categorias = await buscarCategoriasVendidas();

    //Renderizando a página
    return res.render('analise/historicoVendas', {
        categorias: categorias
    });
};

//Apis
module.exports.getApiLivrosVendidos = async (req, res) => {
    
    //Preparando os dados
    const dados = {
        cat_ids: req.query.cat_id,
        inicio: req.query.inicio,
        fim: req.query.fim
    }

    console.log(dados);
    
    let livros = await buscarLivrosVendidos(req.query.cat_id);

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

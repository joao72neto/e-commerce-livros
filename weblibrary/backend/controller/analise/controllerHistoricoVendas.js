const { buscarCategoriasVendidas } = require('../../model/analise/modelHistoricoVendas');
const { buscarLivrosVendidos } = require('../../model/analise/modelHistoricoVendas');
const { buscarDatasVendas } = require('../../model/analise/modelHistoricoVendas');
const { buscarRanking } = require('../../model/analise/modelHistoricoVendas');

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
module.exports.getRanking = async (req, res) => {
    const ranking = await buscarRanking(req.params.clt_id);
    return res.json(ranking);
};

module.exports.getApiLivrosVendidos = async (req, res) => {
    
    //Preparando os dados dos filtros
    const dados = {
        cat_ids: req.query.cat_id,
        inicio: req.query.inicio,
        fim: req.query.fim
    }
    
    //Buscando todos os dados dos livros para análise
    let livros = await buscarLivrosVendidos(dados);

    //Retornando dados json
    return res.json(livros);
}

module.exports.getApiDatasComVendas = async (req, res) => {
    
    //Obtendo as datas
    let datas = await buscarDatasVendas();

    //Formatando as datas
    datas = datas.map(data => {
        const dataFormatada = new Date(data.data_venda).toISOString().split('T')[0];
        return{
            data_venda: dataFormatada
        }
    })

    //Retornando os dados
    return res.json(datas);
};

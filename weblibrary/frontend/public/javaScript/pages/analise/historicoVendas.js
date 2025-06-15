import { buscarLivrosVendidoService } from "/javaScript/service/analise/serviceHistoricoVendas.js";

document.addEventListener('DOMContentLoaded', function(){

    //Carregando todas as funções relacionadas ao histórico de vendas
    montarGrafico();
    montarSelectCategorias();

});

function montarSelectCategorias(){
    const categorias = document.querySelector('#categorias-filtro');
    new Choices(categorias, {
        removeItemButton: true,   
        placeholderValue: 'Pesquisar...',           
        maxItemCount: 10 
    });
}

async function montarGrafico() {
    
    //Obtendo os dados para análise
    const livros_analise = await buscarLivrosVendidoService();

    //Agrupando as datas
    const datas = [...new Set(livros_analise.map(item => item.data_venda))].sort();
    console.log(datas);

    //Agrupando os livros com as datas
    const livrosMap = {};
    livros_analise.forEach(item => {
        
        //Obtendo dados
        const titulo = item.lvr_titulo;
        const data = item.data_venda;
        const qtd = parseInt(item.total_vendido);

        if(!livrosMap[titulo]){
            livrosMap[titulo] = {};
        }
        
        livrosMap[titulo][data] = qtd;

    });

    //Montando o Dataset
    const datasets = Object.entries(livrosMap).map(([titulo, vendasPorData]) => {
        const data = datas.map(data => vendasPorData[data] || 0);
        return {
            name: titulo,
            data: data,
        }
    });

    //Configurando o gráfico
    const options = {
        chart: {
            type: 'line'
        },
        series: datasets,
        xaxis: {
            categories: datas
        }
    }

    //Renderizando o gráfico
    const chart = new ApexCharts(
        document.querySelector('#historico-vendas'), 
        options
    );

    chart.render();
}
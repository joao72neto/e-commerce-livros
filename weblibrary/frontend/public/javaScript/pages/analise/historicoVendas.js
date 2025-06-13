import { buscarLivrosVendidoService } from "/javaScript/service/analise/serviceHistoricoVendas.js";

document.addEventListener('DOMContentLoaded', function(){

    //Carregando todas as funções relacionadas ao histórico de vendas
    montarGrafico();
    montarSelectLivros();
    montarSelectCategorias();

});

function montarSelectLivros(){
    const livros = document.querySelector('#livros-filtro');
    new Choices(livros, {
        removeItemButton: true,  
        placeholderValue: 'Pesquisar...',          
        maxItemCount: 10 
    });
   
}

function montarSelectCategorias(){
    const categorias = document.querySelector('#categorias-filtro');
    new Choices(categorias, {
        removeItemButton: true,   
        placeholderValue: 'Pesquisar...',           
        maxItemCount: 10 
    });
}

async function montarGrafico() {
    
    // //Obtendo os dados para análise
    // const livros_analise = await buscarLivrosVendidoService();

    // //Agrupando as datas
    // const datas = [...new Set(livros_analise.map(item => item.data_venda))].sort();
    // console.log(datas);

    // //Agrupando os livros com as datas
    // const livrosMap = {};
    // livros_analise.forEach(item => {
        
    //     //Obtendo dados
    //     const titulo = item.lvr_titulo;
    //     const data = item.data_venda;
    //     const qtd = parseInt(item.total_vendido);

    //     if(!livrosMap[titulo]){
    //         livrosMap[titulo] = {};
    //     }
        
    //     livrosMap[titulo][data] = qtd;

    // });

    // //Montando o Dataset
    // const datasets = Object.entries(livrosMap).map(([titulo, vendasPorData]) => {
    //     const data = datas.map(data => vendasPorData[data] || 0);
    //     return {
    //         label: titulo,
    //         data: data,
    //         borderColor: gerarCorAleatoria(),
    //         borderWidth: 3,
    //         tension: 0.3,
    //         clip: false
    //     }
    // });

    //Configurando o gráfico
    const options = {
        chart: {
            type: 'line'
        },
        series: [{
            name: 'sales',
            data: [30,40,35,50,49,60,70,91,125]
        }],
        xaxis: {
            categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
        }
    }

    //Renderizando o gráfico
    const chart = new ApexCharts(
        document.querySelector('#historico-vendas'), 
        options
    );

    chart.render();
}

//Função que gera cores aleatórias
function gerarCorAleatoria() {
    const r = Math.floor(Math.random() * 156) + 100;
    const g = Math.floor(Math.random() * 156) + 100;
    const b = Math.floor(Math.random() * 156) + 100;
    return `rgb(${r}, ${g}, ${b})`;
}

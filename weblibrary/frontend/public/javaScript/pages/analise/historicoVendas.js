import { buscarLivrosVendidoService } from "/javaScript/service/analise/serviceHistoricoVendas.js";

document.addEventListener('DOMContentLoaded', function(){

    //Carregando todas as funções relacionadas ao histórico de vendas
    montarSelectCategorias();
    montarInputPeriodo(); 
    filtrarPorCategora();
    montarGrafico();
});

let choicesInstance;
let chart = null;

function montarInputPeriodo(){
    flatpickr('#data-range', {
        mode: 'range',
        dateFormat: 'Y-m-d',
        locale: 'pt',
        enable: [
            {
                from: '2025-06-01',
                to: '2025-06-13'
            }
        ]
    });
}

//Função que monta o select das categorias
function montarSelectCategorias(){
    const categorias = document.querySelector('#categorias-filtro');
    choicesInstance = new Choices(categorias, {
        removeItemButton: true,   
        placeholderValue: 'Pesquisar...',           
        maxItemCount: 10 
    });
}

//Função que pega as categorias selecionadas para filtro
function filtrarPorCategora(){
    document.querySelector('.btn-flt-cat').addEventListener('click', (event) => {
        event.preventDefault();
        
        //Obetendo as categorias selecionadas
        const categorias = choicesInstance.getValue(true);
        console.log(categorias);

        //Montando a url para o filtro
        let url = '/api/vendas/historico?';
        if (categorias.length !== 0){
            const params = categorias.map(cat_id => `cat_id=${encodeURIComponent(cat_id)}`).join('&');
            url += params;

        }else{

            //Retirnado o ? caso não haja parâmetros
            url = url.slice(0, -1);
        }

        //Filtrando os dados
        fetch(url)
            .then(res => res.json())
            .then(data => {
                montarGrafico(data);
            });
    });
}

//Função que monta o gráfico na página
async function montarGrafico(livros_analise) {
    
    if(chart){
        chart.destroy(); 
    }

    if(!livros_analise){
        livros_analise = await buscarLivrosVendidoService();
    }

    //Agrupando as datas
    const datas = [...new Set(livros_analise.map(item => item.data_venda))].sort();

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
    chart = new ApexCharts(
        document.querySelector('#historico-vendas'), 
        options
    );

    chart.render();
}
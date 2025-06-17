import { buscarLivrosVendidoService } from "/javaScript/service/analise/serviceHistoricoVendas.js";
import { buscarDatasVendaService } from "/javaScript/service/analise/serviceHistoricoVendas.js";

document.addEventListener('DOMContentLoaded', function(){

    //Carregando todas as funções relacionadas ao histórico de vendas
    montarSelectCategorias();
    montarInputPeriodo(); 
    filtrarPorCategora();
    filtroPorPeriodo();
    montarGrafico();

    //Limpando os filtros
    limparFiltroPeriodo();
    limparFiltroCategorias();

});

let choicesInstance;
let chart = null;

function limparFiltroPeriodo(){
    document.querySelectorAll('.btn-clean-periodo').forEach(btn => {
        btn.addEventListener('click', function(event){
            event.preventDefault();
            const box = this.closest('.box');
            const input = box.querySelector('input');
            input.value = '';
        });
    });
}

function limparFiltroCategorias(){
    document.querySelectorAll('.btn-clean-cat').forEach(btn => {
        btn.addEventListener('click', function(event){
            event.preventDefault();
            choicesInstance.removeActiveItems();
        });
    });
}


async function montarInputPeriodo(){

    //Obtendo todas as datas dom vendas;
    const datas = await buscarDatasVendaService();

    //Pegando apenas as datas de início e fim
    const inicio = datas[0].data_venda;
    const fim = datas[datas.length-1].data_venda;

    //Montando o input com as datas disponíveis
    flatpickr('#data-range', {
        mode: 'range',
        dateFormat: 'Y-m-d',
        locale: 'pt',
        enable: [
            {
                from: inicio,
                to: fim
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

//Estados dos filtros
const filtros = {
    inicio: null,
    fim: null,
    categorias: []
}

//Atualizando a URL dos filtros
function atualizarUrlFiltros(){

    //Url base
    let url = '/api/vendas/historico?';
    const params = []

    //Adicionando os filtros por data
    if(filtros.inicio){
        params.push(`inicio=${encodeURIComponent(filtros.inicio)}`);
        if(filtros.fim){
            params.push(`fim=${encodeURIComponent(filtros.fim)}`);
        }
    }

    //Adicionando os filtros por categorias
    if(filtros.categorias.length > 0){
        filtros.categorias.forEach(cat => {
            params.push(`cat_id=${encodeURIComponent(cat)}`);
        });
    }

    //Retornando a url atualizada
    return url + params.join('&');
}

//Filtrando os dados por período
function filtroPorPeriodo(){

    document.querySelector('.btn-flt-data').addEventListener('click', (event) => {
        event.preventDefault();
        
        //Obtendo o período desejado
        let periodo = document.querySelector('#data-range').value;
        
        //Obtendo os dados de início e fim
        if(periodo){
            periodo = periodo.split(' ');
            filtros.inicio = periodo[0] || null;
            filtros.fim = periodo[2] || null;
        }else{
            filtros.inicio = null;
            filtros.fim = null;
        }
        
        //Atualizando a URL
        let url = atualizarUrlFiltros();

        //Filtrando os dados
        fetch(url)
            .then(res => res.json())
            .then(data => {
                montarGrafico(data);
            });

    });  
}

//Função que pega as categorias selecionadas para filtro
function filtrarPorCategora(){
    document.querySelector('.btn-flt-cat').addEventListener('click', (event) => {
        event.preventDefault();
        
        //Obetendo as categorias selecionadas
        filtros.categorias = choicesInstance.getValue(true) || [];

        //Atualizando a url
        const url = atualizarUrlFiltros();
    
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

    //Preparando os dados
    const series = Object.entries(livrosMap).map(([titulo, datasDoLivro]) => {
        return{
            name: titulo,
            data: datas.map(data => ({
                x: parseFusoBr(data),
                y: datasDoLivro[data] || 0
            }))
        }
    });

    //Configurando o gráfico
    const options = {
        chart: {
            type: 'area',
        },
        stroke: {
            curve: 'smooth'
        },
        series: series,
        xaxis: {
            type: 'datetime',
            labels: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm'
            }
        }
    }

    //Renderizando o gráfico
    chart = new ApexCharts(
        document.querySelector('#historico-vendas'), 
        options
    );

    chart.render();
}

//Funções que ajustam o fuso horário para BR
function parseFusoBr(data){
    const dataBr = new Date(data).toLocaleString('pt');
    return brParaIsoString(dataBr);
}

function brParaIsoString(dataBr){

    let dataHora = dataBr.split(', ');
    let dataInversa = dataHora[0].split('/').reverse().join('-')
    let timeIso = `T${dataHora[1]}.000Z`;

    return dataInversa + timeIso;
}


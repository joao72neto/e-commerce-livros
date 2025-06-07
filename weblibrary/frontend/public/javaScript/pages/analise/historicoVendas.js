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
        placeholderValue: 'Selecione os livros',
        maxItemCount: 10 
    });
   
}

function montarSelectCategorias(){
    const categorias = document.querySelector('#categorias-filtro');
    new Choices(categorias, {
        removeItemButton: true,            
        placeholderValue: 'Selecione as Categorias',
        searchPlaceholderValue: 'Buscar Categoria...',
        maxItemCount: 10 
    });
}

function montarGrafico() {
    const ctx = document.getElementById('historico-vendas');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr'],
            datasets: [
                {
                    label: 'Produto X',
                    data: [10, 15, 10, 11],
                    borderColor: 'red',
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Produto Y',
                    data: [6, 5, 40, 2],
                    borderColor: 'blue',
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Produto Z',
                    data: [20, 6, 1, 34],
                    borderColor: 'green',
                    borderWidth: 2,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    onClick: null,
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20
                    }
                }
            }
        }
    });
}

//GET

//Obtendo dados dos livros vendidos para análise
export async function buscarLivrosVendidoService() {
    try{

        const res = await fetch(`/api/vendas/historico/`);
        const livros = await res.json();
        return livros;

    }catch(err){
        console.error(`Erro no buscarLivrosVendidoService - serviceHistoricoVendas: ${err}`);
        throw err;
    }
}

//Obtendo todas as datas com vendas
export async function buscarDatasVendaService() {
    try{

        const res = await fetch(`/api/vendas/historico/datas`);
        const datas = await res.json();
        return datas;

    }catch(err){
        console.error(`Erro no buscarDatasVendasService - serviceHistoricoVendas: ${err}`);
        throw err;
    }
}


//GET

//Get clients ranking
export async function buscarRankingService(clt_id) {
    try{

        const res = await fetch(`/api/ranking/${clt_id}`);
        const ranking = await res.json();
        return ranking;

    }catch(err){
        console.error(`Erro no buscarRankingService - serviceHistoricoVendas: ${err}`);
        throw err;
    }
}

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


const { getDb } = require('../../config/db');

//SELECT

//Obtendo categorias distintas da vw_historico_vendas
module.exports.buscarCategoriasVendidas = async () => {
    
    //Obtendo o banco
    const db = await getDb();

    let sql = `
        select distinct 
            cat_id,
            cat_nome 
        from 
            vw_historico_vendas;
    `;

    try{
        const [categorias] = await db.query(sql);
        return categorias;
        
    }catch(err){
        console.error(`Erro no buscarCategoriasVendidas - modelHistoricoVendas: ${err}`);
        throw err;
    }
}

//Obetendo as datas com compras
module.exports.buscarDatasVendas = async () => {
    
    //Obtendo o banco
    const db = await getDb();

    //Montando a query
    const sql = `
        select distinct
            hvnd_data data_venda
        from 
            vw_historico_vendas
        order by
	        hvnd_data;
    `;

    //Buscando os dados no banco
    try{
        const [datas] = await db.query(sql);
        return datas;
        
    }catch(err){
        console.error(`Erro no buscarDatasVendas - modelHistoricoVendas: ${err}`);
        throw err;
    }
}

//Obtendo os livros vendidos da vw_historico_vendas
module.exports.buscarLivrosVendidos = async (dados) => {
    

    //Preparando os dados dos filtros
    const cat_ids = dados.cat_ids;
    const inicio = dados.inicio;
    const fim = dados.fim;

    //Obtendo o banco
    const db = await getDb();

    let sql = `
        select
            lvr_id,
            lvr_titulo,
            cat_id,
            sum(hvnd_qtd) total_vendido,
            hvnd_data data_venda
        from 
            vw_historico_vendas
    `;

    const condicoes = [];
    const valores = [];

    //Filtrando os dados por categorias
    if(cat_ids){
        valores.push(...cat_ids);
        let placeholders = []; 
        for(let i=0; i < valores.length; i++){
            placeholders.push('?');
        }
        placeholders = placeholders.join(', ');
        condicoes.push(`cat_id IN (${placeholders})`);
        
    }

    //Filtrando por data de início
    if(inicio && !fim){
        condicoes.push(`hvnd_data between ? and ?`);
        valores.push(inicio + ' 00:00:00');
        valores.push(inicio + ' 23:59:59');
    }

    if(inicio && fim){
        condicoes.push(`hvnd_data between ? and ?`);
        valores.push(inicio + ' 00:00:00');
        valores.push(fim + ' 23:59:59');
    }

    //Aplicando as condições
    if(condicoes.length > 0){
        sql += 'WHERE ' + condicoes.join(' AND ');
    }

    sql += `
        group by
            lvr_id,
            lvr_titulo,
            cat_id,
            hvnd_data
        order by
            data_venda;
    `;

    try{
        const [livros] = await db.query(sql, valores);
        return livros;
        
    }catch(err){
        console.error(`Erro no buscarLivrosVendidos - modelHistoricoVendas: ${err}`);
        throw err;
    }
}
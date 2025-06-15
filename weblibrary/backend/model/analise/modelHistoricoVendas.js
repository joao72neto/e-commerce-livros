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

//Obtendo os livros vendidos da vw_historico_vendas
module.exports.buscarLivrosVendidos = async (cat_ids) => {
    

    //Obtendo o banco
    const db = await getDb();

    let sql = `
        select
            lvr_id,
            lvr_titulo,
            cat_id,
            sum(vnd_qtd) total_vendido,
            date(vnd_data) data_venda
        from 
            vw_historico_vendas
    `;

    //Filtrando os dados
    if(cat_ids){
        let placeholders = []
        for(let i=0; i < cat_ids.length; i++){
            placeholders.push('?');
        }
        placeholders = placeholders.join(', ');
        sql += `WHERE cat_id IN (${placeholders})`
    }

    sql += `
        group by
            lvr_id,
            lvr_titulo,
            cat_id,
            date(vnd_data)
        order by
            data_venda;
    `;

    try{
        const [livros] = await db.query(sql, cat_ids);
        return livros;
        
    }catch(err){
        console.error(`Erro no buscarLivrosVendidos - modelHistoricoVendas: ${err}`);
        throw err;
    }
}
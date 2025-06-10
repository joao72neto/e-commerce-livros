const { getDb } = require('../../config/db');

//SELECT

//Obtendo a view com os dados de vendas
module.exports.buscarViewHistoricoVendas = async () => {
    
    //Obtendo o banco
    const db = await getDb();

    sql = `
        select 
            *
        from
            vw_historico_vendas;
    `;

    try{
        const [historico_vendas] = await db.query(sql);
        return historico_vendas;
        
    }catch(err){
        console.error(`Erro no buscarViewHistoricoVendas - modelHistoricoVendas: ${err}`);
        throw err;
    }
}
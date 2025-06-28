const { getDb } = require('../../config/db');

//SELECT 

//Buscando todas as transações do banco
module.exports.buscarTodasTransacoes = async () => {
    
    //Obtendo o banco
    const db = await getDb();

    try{
        const [transacoes] = await db.query('select * from transacoes');
        return transacoes;
        
    }catch(err){
        console.error(`Erro no buscarTodasTransacoes - modelTransacoes: ${err}`);
        throw err;
    }
}

//Buscando transações por id de clientes
module.exports.buscarTransacoesClienteId = async (id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `
        select
            *
        from
            transacoes
        where
            trs_clt_id = ?
        order by
            trs_dataHora desc;
    `;

    try{
        let [transacoes] = await db.query(sql, id);

        transacoes = transacoes.map(trs => ({
            ...trs,
            trs_dataHora: new Date(trs.trs_dataHora).toLocaleString('pt-BR')
        }))

        return transacoes;
        
    }catch(err){
        console.error(`Erro no buscarTransacoesClienteId - modelTransacoes: ${err}`);
        throw err;
    }
}

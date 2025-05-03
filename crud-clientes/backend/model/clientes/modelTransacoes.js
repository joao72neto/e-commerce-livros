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

    try{
        const [transacoes] = await db.query(`select * from transacoes where trs_clt_id = ?`, id);
        return transacoes;
        
    }catch(err){
        console.error(`Erro no buscarTransacoesClienteId - modelTransacoes: ${err}`);
        throw err;
    }
}

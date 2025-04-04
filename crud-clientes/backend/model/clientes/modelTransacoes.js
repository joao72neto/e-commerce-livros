const db = require('../../config/db');

//SELECT 

//Buscando todas as transações do banco
module.exports.buscarTodasTransacoes = async () => {
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
    try{
        const [transacoes] = await db.query(`select * from transacoes where trs_clt_id = ?`, id);
        return transacoes;
        
    }catch(err){
        console.error(`Erro no buscarTransacoesClienteId - modelTransacoes: ${err}`);
        throw err;
    }
}

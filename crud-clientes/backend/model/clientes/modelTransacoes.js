const db = require('../../config/db');

//SELECT 

//Buscando todas as transações do banco
async function buscarTodasTransacoes() {
    try{
        const [transacoes] = await db.query('select * from transacoes');
        return transacoes;
        
    }catch(err){
        console.error(`Erro no buscarTodasTransacoes - modelTransacoes: ${err}`);
        throw err;
    }
}

//Buscando transações por id de clientes
async function buscarTransacoesClienteId(id) {
    try{
        const [transacoes] = await db.query(`select * from transacoes where trs_clt_id = ?`, id);
        return transacoes;
        
    }catch(err){
        console.error(`Erro no buscarTransacoesClienteId - modelTransacoes: ${err}`);
        throw err;
    }
}

module.exports = {buscarTodasTransacoes,buscarTransacoesClienteId};
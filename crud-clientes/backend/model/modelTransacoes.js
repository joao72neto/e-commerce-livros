const db = require('../config/db');

//Buscando todas as transações do banco
async function buscarTodasTransacoes() {
    try{
        const [transacoes] = await db.query('select * from transacoes');
        return transacoes;
        
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

module.exports = {buscarTodasTransacoes};
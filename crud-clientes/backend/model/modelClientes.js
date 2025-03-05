const db = require('../config/db');

//Bsucando todos os clientes do banco de dados
async function buscarTodosClientes() {
    try{
        const [clientes] = await db.query('select * from clientes');
        return clientes;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}


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


module.exports = {buscarTodosClientes, buscarTodasTransacoes};


const db = require('../config/db');

//Função que pega todos os cartões do banco
async function buscarTodosCartoes() {
    try{
        const [cartoes] = await db.query('select * from cartoes');
        return cartoes;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Função que pegar cartões de um determinado cliente
async function buscarCartoesClienteId(id) {
    try{
        const [cartoes] = await db.query(`select * from cartoes where car_clt_id = ${id}`);
        return cartoes;
        
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//exportando as funções
module.exports = {buscarCartoesClienteId, buscarTodosCartoes};

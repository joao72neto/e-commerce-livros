const db = require('../config/db');

//Bsucando todos os endereços do banco de dados
async function buscarTodosEnderecos() {
    try{
        const [enderecos] = await db.query('select * from enderecos');
        return enderecos;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Exportando as funções
module.exports = {buscarTodosEnderecos};


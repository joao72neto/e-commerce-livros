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

//Exportando as funções
module.exports = {buscarTodosClientes};


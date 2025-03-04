const db = require('../config/db');

//Consultando todos os usuários cadastrados no banco 
async function buscarTodosClientes() {
    try{
        const [clientes] = await db.query('select * from clientes');
        return clientes;
    }catch(err){
        console.error(`Deu ruim: ${err}`);
        throw err;
    }
}

module.exports = {buscarTodosClientes};
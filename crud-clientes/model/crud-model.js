const db  = require('../config/db');

//Pegando todos os clientes do banc (teste)
async function buscarTodosClientes() {
    try{
        const [clientes] = await db.query('select * from Clientes');
        return clientes;
    }catch(err){
        console.error(`Deu ruim: ${err}`);
        throw err;
    }
}

console.log(buscarTodosClientes());
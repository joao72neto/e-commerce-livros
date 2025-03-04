const db = require('../config/db');

//Bsucando todos os clientes do banco de dados
async function buscarTodosClientes() {
    try{
        const [clientes] = await db.query('select * from clientes');
        return clientes;
    }catch(err){
        console.error(`Deu ruim: ${err}`);
        throw err;
    }
}

//Buscando cliente por id
async function buscarClientesId(id) {
    try{
        const [clientes] = await db.query(`select * from clientes where clt_id=${id}`);
        return clientes;
    }catch(err){
        console.error(`Deu ruim: ${err}`);
        throw err;
    }
}

module.exports = {buscarTodosClientes, buscarClientesId};


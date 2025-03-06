const db = require('../config/db');

//UPDATE

//Inativando um cliente específico
async function inativarCliente(id) {
    try{
        await db.query(`update clientes set clt_status = 0 where clt_id = ${id}`);

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Ativando um cliente específico
async function ativarCliente(id) {
    try{
        const [clientes] = await db.query(`update clientes set clt_status = 1 where clt_id = ${id}`);
        return clientes;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//SELECT

//Buscando clientes ativos
async function buscarClientesAtivos() {
    try{
        const [clientes] = await db.query('select * from clientes where clt_status = 1');
        return clientes;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Buscando clientes inativos
async function buscarClientesInativos() {
    try{
        const [clientes] = await db.query('select * from clientes where clt_status = 0');
        return clientes;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

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

//Bsucando clientes por id
async function buscarClientesId(id) {
    try{
        const [clientes] = await db.query(`select * from clientes where clt_id = ${id}`);
        return clientes;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}


//Exportando as funções de busca
module.exports = {buscarTodosClientes, 
                  buscarClientesId,
                  buscarClientesInativos,
                  buscarClientesAtivos, 
                  inativarCliente,
                  ativarCliente};


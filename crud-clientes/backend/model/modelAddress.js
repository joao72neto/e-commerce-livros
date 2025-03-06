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

//Bsucando todos os endereços do banco de dados
async function buscarEnderecoId(id) {
    try{
        const [endereco] = await db.query(`select * from enderecos where end_id = ${id}`);
        return endereco;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Bsucando endereços por id de cliente
async function buscarEnderecosClienteId(id) {
    try{
        const [enderecos] = await db.query(`select * from enderecos where end_clt_id = ${id}`);
        return enderecos;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}


//Exportando as funções
module.exports = {buscarTodosEnderecos, buscarEnderecosClienteId, buscarEnderecoId};


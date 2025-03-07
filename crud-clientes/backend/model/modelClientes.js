const db = require('../config/db');

//INSERT

//Função que insere um novo cliente no banco 
async function cadastrarCliente(dados) {

    //Consulta SQL
    const sql = `INSERT INTO clientes (clt_nome, clt_genero, clt_dataNasc,  clt_cpf, clt_telefone, clt_email, clt_senha, clt_ranking, clt_status) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1)`;

    //Valores a serem inseridos no banco
    const valores = [
        dados.clt_nome,
        dados.clt_genero,
        dados.clt_dataNasc,
        dados.clt_cpf,
        dados.clt_telefone,
        dados.clt_email,
        dados.clt_senha
    ]

    try{
        await db.query(sql, valores)
            .catch(err => console.error(`Erro ao cadastrar cliente: ${err}`));
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

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
        await db.query(`update clientes set clt_status = 1 where clt_id = ${id}`);
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
async function buscarClienteId(id) {
    try{
        const [cliente] = await db.query(`select * from clientes where clt_id = ${id}`);
        return cliente;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}


//Exportando as funções de busca
module.exports = {buscarTodosClientes, 
                  buscarClienteId,
                  buscarClientesInativos,
                  buscarClientesAtivos, 
                  inativarCliente,
                  ativarCliente,
                  cadastrarCliente};


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
        const [result] = await db.query(sql, valores);
        return result.insertId;
    }catch(err){
        console.error(`Erro no cadastrarCliente - modelClientes: ${err}`);
        throw err;
    } 
    
}

//UPDATE

//Atualizando os dados dos clientes no banco
async function atualizarCliente(dados, clt_id) {
    
    const campos = Object.keys(dados).map(key =>  `${key} = ?`).join(', ');
    let valores = Object.values(dados);
    valores.push(clt_id);

    sql = `update clientes set ${campos} where clt_id = ?`;

    try{
        const [cliente] = await db.query(sql, valores);
        return cliente;
        
    }catch(err){
        console.error(`Erro no atualizarCliente - modelClientes: ${err}`);
        throw err;
    }

}

//Alterar senha cliente de um cliente
async function alterarSenhaCliente(senha, id) {
    try{
        await db.query(`update clientes set clt_senha = ? where clt_id = ?`, [senha.clt_senha, id]);
    }catch(err){
        console.error(`Erro no alterarSenhaCliente - modelClientes: ${err}`);
        throw err;
    }
}


//Inativando um cliente específico
async function inativarCliente(id) {
    try{
        await db.query(`update clientes set clt_status = 0 where clt_id = ?`, id);
    }catch(err){
        console.error(`Erro no inativarCliente - modelClientes: ${err}`);
        throw err;
    }
}

//Ativando um cliente específico
async function ativarCliente(id) {
    try{
        await db.query(`update clientes set clt_status = 1 where clt_id = ?`, id);
    }catch(err){
        console.error(`Erro no ativarCliente - modelClientes: ${err}`);
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
        console.error(`Erro no buscarClientesAtivos - modelClientes: ${err}`);
        throw err;
    }
}

//Buscando clientes inativos
async function buscarClientesInativos() {
    try{
        const [clientes] = await db.query('select * from clientes where clt_status = 0');
        return clientes;
    }catch(err){
        console.error(`Erro no buscarClientesInativos - modelClientes: ${err}`);
        throw err;
    }
}

//Bsucando todos os clientes do banco de dados
async function buscarTodosClientes() {
    try{
        const [clientes] = await db.query('select * from clientes');
        return clientes;
    }catch(err){
        console.error(`Erro no buscarTodosClientes - modelClientes: ${err}`);
        throw err;
    }
}

//Bsucando clientes por id
async function buscarClienteId(id) {
    try{
        const [cliente] = await db.query(`select * from clientes where clt_id = ?`, id);
        return cliente;
    }catch(err){
        console.error(`Erro no buscarClienteId - modelClientes: ${err}`);
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
                  cadastrarCliente,
                  atualizarCliente, 
                  alterarSenhaCliente};


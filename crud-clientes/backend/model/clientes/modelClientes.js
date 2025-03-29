const db = require('../../config/db');

//DELETE

//Função que deleta clientes do banco de dados
module.exports.deletarClienteId = async (id) => {
    const sql = `DELETE FROM clientes WHERE clt_id = ?`;

    try{
        await db.query(sql, id);
    }catch(err){
        console.error(`Erro no deletarClienteId - modelClientes ${err}`);
    }
}

//INSERT

//Função que insere um novo cliente no banco 
module.exports.cadastrarCliente = async (dados) => {

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
module.exports.atualizarCliente = async (dados, clt_id) => {
    
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
module.exports.alterarSenhaCliente = async (senha, id) => {
    try{
        await db.query(`update clientes set clt_senha = ? where clt_id = ?`, [senha.clt_senha, id]);
    }catch(err){
        console.error(`Erro no alterarSenhaCliente - modelClientes: ${err}`);
        throw err;
    }
}


//Inativando um cliente específico
module.exports.inativarCliente = async (id) => {
    try{
        await db.query(`update clientes set clt_status = 0 where clt_id = ?`, id);
    }catch(err){
        console.error(`Erro no inativarCliente - modelClientes: ${err}`);
        throw err;
    }
}

//Ativando um cliente específico
module.exports.ativarCliente = async (id) => {
    try{
        await db.query(`update clientes set clt_status = 1 where clt_id = ?`, id);
    }catch(err){
        console.error(`Erro no ativarCliente - modelClientes: ${err}`);
        throw err;
    }
}

//SELECT

//Filtro do Usuário
module.exports.filtrarCliente = async (dados) => {
    
    let sql = 'SELECT * FROM clientes WHERE 1=1';
    let valores = []

    if(dados.clt_nome){
        sql += ' AND clt_nome LIKE ?';
        valores.push(`%${dados.clt_nome}%`);
    }

    if(dados.clt_cpf){
        sql += ' AND clt_cpf = ?'
        valores.push(dados.clt_cpf);
    }

    if(dados.clt_dataNasc){
        sql += ' AND clt_dataNasc = ?';
        valores.push(dados.clt_dataNasc);
    }

    if(dados.clt_genero){
        sql += ' AND clt_genero = ?'
        valores.push(dados.clt_genero);
    }

    if(dados.clt_email){
        sql += ' AND clt_email LIKE ?';
        valores.push(`%${dados.clt_email}%`);
    }

    if(dados.clt_telefone){
        sql += ' AND clt_telefone LIKE ?';
        valores.push(`%${dados.clt_telefone}%`);
    }
    
    try{
        const [clientes] = await db.query(sql, valores);
        return clientes;

    }catch(err){
        console.error(`Erro no filtrarCliente - modelClientes: ${err}`);
        throw err;
    }
}


//Buscando clientes ativos
module.exports.buscarClientesAtivos = async () => {
    try{
        const [clientes] = await db.query('select * from clientes where clt_status = 1');
        return clientes;
    }catch(err){
        console.error(`Erro no buscarClientesAtivos - modelClientes: ${err}`);
        throw err;
    }
}

//Buscando clientes inativos
module.exports.buscarClientesInativos = async () => {
    try{
        const [clientes] = await db.query('select * from clientes where clt_status = 0');
        return clientes;
    }catch(err){
        console.error(`Erro no buscarClientesInativos - modelClientes: ${err}`);
        throw err;
    }
}

//Bsucando todos os clientes do banco de dados
module.exports.buscarTodosClientes = async () => {
    try{
        const [clientes] = await db.query('select * from clientes');
        return clientes;
    }catch(err){
        console.error(`Erro no buscarTodosClientes - modelClientes: ${err}`);
        throw err;
    }
}

//Bsucando clientes por id
module.exports.buscarClienteId = async (id) => {
    try{
        const [cliente] = await db.query(`select * from clientes where clt_id = ?`, id);
        return cliente;
    }catch(err){
        console.error(`Erro no buscarClienteId - modelClientes: ${err}`);
        throw err;
    }
}



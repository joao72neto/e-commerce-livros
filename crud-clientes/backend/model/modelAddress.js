const db = require('../config/db');

//INSERT

//Cadastrando um novo endereço no banco de dadso
async function cadastrarAddress(dados) {

    //Consulta SQL
    sql = `INSERT INTO enderecos (end_clt_id, end_nome, end_tipoResidencia, end_tipoLogradouro, end_logradouro, end_numero, end_bairro, end_cep, end_cidade, end_estado, end_pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    //Pegando os valores a serem inseridos no banco
    const valores = [
        dados.end_clt_id,
        dados.end_nome,
        dados.end_tipoResidencia,
        dados.end_tipoLogradouro,
        dados.end_logradouro,
        dados.end_numero,
        dados.end_bairro,
        dados.end_cep,
        dados.end_cidade,
        dados.end_estado,
        dados.end_pais
    ]

    try{
        await db.query(sql, valores)
            .catch(err => `Erro ao cadastrar endereço ${err}`);
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

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
module.exports = {buscarTodosEnderecos, buscarEnderecosClienteId, buscarEnderecoId, cadastrarAddress};


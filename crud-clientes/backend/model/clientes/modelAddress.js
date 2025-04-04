const db = require('../../config/db');

//DELETE

//Função que deleta todos os dados de uma tabela
module.exports.deletarAddressClienteId = async (clt_id) => {
    const sql = `DELETE FROM enderecos WHERE end_clt_id = ?`;

    try{
        await db.query(sql, clt_id);
    }catch(err){
        console.error(`Erro no deletarAddressClienteId- modelAddress ${err}`);
    }
}

//Função que deleta clientes do banco de dados
module.exports.deletarAddressId = async (id) => {
    const sql = `DELETE FROM enderecos WHERE end_id = ?`;

    try{
        await db.query(sql, id);
    }catch(err){
        console.error(`Erro no deletarAddressId- modelAddress ${err}`);
    }
}

//INSERT

//Cadastrando um novo endereço no banco de dadso
module.exports.cadastrarAddress = async (dados) => {

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

    await db.query(sql, valores)
        .catch(err => console.error(`Erro no cadastrarAddress - modelAddress: ${err}`));
}

//UPDATE

//Atualizando os endereços do banco de dados
module.exports.atualizarAddress = async (dados, end_id) => {
    
    const campos = Object.keys(dados).map(key =>  `${key} = ?`).join(', ');
    let valores = Object.values(dados);
    valores.push(end_id);

    sql = `update enderecos set ${campos} where end_id = ?`;

    try{
        const [endereco] = await db.query(sql, valores);
        return endereco;

    }catch(err){
        console.error(`Erro no atualizarAddress - modelAddress: ${err}`);
        throw err;
    }

}

//SELECT

//Bsucando todos os endereços do banco de dados
module.exports.buscarTodosEnderecos = async () => {
    try{
        const [enderecos] = await db.query('select * from enderecos');
        return enderecos;
    }catch(err){
        console.error(`Erro no buscarTodosEnderecos - modelAddress: ${err}`);
        throw err;
    }
}

//Bsucando endereço por id
module.exports.buscarEnderecoId = async (id) => {
    try{
        const [endereco] = await db.query(`select * from enderecos where end_id = ?`, id);
        return endereco;
    }catch(err){
        console.error(`Erro no buscarEnderecoId - modelAddress: ${err}`);
        throw err;
    }
}

//Bsucando endereços por id de cliente
module.exports.buscarEnderecosClienteId = async (id) => {
    try{
        const [enderecos] = await db.query(`select * from enderecos where end_clt_id = ?`, id);
        return enderecos;
    }catch(err){
        console.error(`Erro no buscarEnderecosClienteId - modelAddress: ${err}`);
        throw err;
    }
}


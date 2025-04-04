const db = require('../../config/db');

//DELETE

//Função que deleta todos os dados de uma tabela
module.exports.deletarCardsClienteId = async (clt_id) => {
    const sql = `DELETE FROM cartoes WHERE car_clt_id = ?`;

    try{
        await db.query(sql, clt_id);
    }catch(err){
        console.error(`Erro no deletarCardsClienteId- modelCards ${err}`);
    }
}

//Função que deleta clientes do banco de dados
module.exports.deletarCardId = async (id) => {
    const sql = `DELETE FROM cartoes WHERE car_id = ?`;

    try{
        await db.query(sql, id);
    }catch(err){
        console.error(`Erro no deletarCardId - modelCards ${err}`);
    }
}

//INSERT

//Inserindo um novo cartão no banco de dados
module.exports.cadastrarCartao = async (dados) => {

    //Consulta SQL
    sql = `INSERT INTO cartoes (car_clt_id, car_nome, car_numero, car_bandeira, car_cvv, car_principal) VALUES (?, ?, ?, ?, ?, 1)`;

    //Valores a serem inseridos no banco
    const valores = [
        dados.car_clt_id,
        dados.car_nome,
        dados.car_numero,
        dados.car_bandeira,
        dados.car_cvv
    ]

    await db.query(sql, valores)
        .catch(err => `Erro no cadastrarCartao - modelCard: ${err}`);
    
}

//UPDATE

//Atualizando os dados dos cartões no banco
module.exports.atualizarCard = async (dados, car_id) => {
    
    const campos = Object.keys(dados).map(key =>  `${key} = ?`).join(', ');
    let valores = Object.values(dados);
    valores.push(car_id);

    sql = `update cartoes set ${campos} where car_id = ?`;

    try{
        const [cartao] = await db.query(sql, valores);
        return cartao;
        
    }catch(err){
        console.error(`Erro no atualizarCard - modelCard: ${err}`);
        throw err;
    }

}

//SELECT 

//Função que pega todos os cartões do banco
module.exports.buscarTodosCartoes = async () => {
    try{
        const [cartoes] = await db.query('select * from cartoes');
        return cartoes;
    }catch(err){
        console.error(`Erro no buscarTodosCartoes - modelCard: ${err}`);
        throw err;
    }
}

//Função que pegar um cartão pelo seu id
module.exports.buscarCartaoId = async (id) =>{
    try{
        const [cartao] = await db.query(`select * from cartoes where car_id = ?`, id);
        return cartao;
    }catch(err){
        console.error(`Erro no buscarCartaoId - modelCard: ${err}`);
        throw err;
    }
}

//Função que pegar cartões de um determinado cliente
module.exports.buscarCartoesClienteId = async (id) => {
    try{
        const [cartoes] = await db.query(`select * from cartoes where car_clt_id = ?`, id);
        return cartoes;
        
    }catch(err){
        console.error(`Erro no buscarCartoesClienteId - modelCard: ${err}`);
        throw err;
    }
}

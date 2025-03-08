const db = require('../config/db');


//INSERT

//Inserindo um novo cartão no banco de dados
async function cadastrarCartao(dados) {

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
        .catch(err => `Erro ao cadastrar cartão ${err}`);
    
}

//UPDATE

//Atualizando os dados dos cartões no banco
async function atualizarCard(dados, car_id) {
    
    const campos = Object.keys(dados).map(key =>  `${key} = ?`).join(', ');
    let valores = Object.values(dados);
    valores.push(car_id);

    sql = `update cartoes set ${campos} where car_id = ?`;

    try{
        const [cartao] = await db.query(sql, valores);
        return cartao;
        
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }

}

//SELECT 

//Função que pega todos os cartões do banco
async function buscarTodosCartoes() {
    try{
        const [cartoes] = await db.query('select * from cartoes');
        return cartoes;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Função que pegar um cartão pelo seu id
async function buscarCartaoId(id) {
    try{
        const [cartao] = await db.query(`select * from cartoes where car_id = ${id}`);
        return cartao;
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Função que pegar cartões de um determinado cliente
async function buscarCartoesClienteId(id) {
    try{
        const [cartoes] = await db.query(`select * from cartoes where car_clt_id = ${id}`);
        return cartoes;
        
    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//exportando as funções
module.exports = {buscarCartoesClienteId, buscarTodosCartoes, buscarCartaoId, cadastrarCartao, atualizarCard};

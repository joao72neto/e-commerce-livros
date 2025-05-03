const { getDb } = require('../../config/db');

//DELETE

//Função que deleta todos os dados de uma tabela
module.exports.deletarCardsClienteId = async (clt_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `DELETE FROM cartoes WHERE car_clt_id = ?`;

    try{
        await db.query(sql, clt_id);
    }catch(err){
        console.error(`Erro no deletarCardsClienteId- modelCards ${err}`);
    }
}

//Função que deleta clientes do banco de dados
module.exports.deletarCardId = async (id) => {
    
    //Obtendo o banco
    const db = await getDb();
    
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

    //Obtendo o banco
    const db = await getDb();

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
    
    //Obtendo o banco
    const db = await getDb();

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

//Função que desativa o status de todos os cartões de um cliente
module.exports.desativarCartoesClienteId = async (clt_id) => {

    //Obtendo o banco
    const db = await getDb();

    //Preparando a query
    let sql = `
        update 
            cartoes	
            set car_status = 0
        where car_clt_id = ?;

    `;

    //Desativando todos os cartões do cliente
    try{
        await db.query(sql, clt_id);
        
    }catch(err){
        console.error(`Erro no desativarCartoesClienteId - modelCard: ${err}`);
        throw err;
    }
}


//Função que atuazliaza o status do cartão no banco
module.exports.atualizarCardIdStatus = async (car_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    //Obtendo o cartão a ser atualizado
    const card = await this.buscarCartaoId(car_id);
    
    //Preparando a query
    let sql = `
        update 
            cartoes
            set car_status = 1
        where 
            car_id = ?;
    `;

    if(card[0].car_status === 1){

        sql = `
            update 
                cartoes
                set car_status = 0
            where 
                car_id = ?;
        `;
    }

    //Atualizando o status do cartão
    try{
        const [cartao] = await db.query(sql, car_id);
        return cartao;
        
    }catch(err){
        console.error(`Erro no atualizarCardIdStatus - modelCard: ${err}`);
        throw err;
    }

}

//SELECT 

//Função que pega todos os cartões do banco
module.exports.buscarTodosCartoes = async () => {
    
    //Obtendo o banco
    const db = await getDb();
    
    try{
        const [cartoes] = await db.query('select * from cartoes');
        return cartoes;
    }catch(err){
        console.error(`Erro no buscarTodosCartoes - modelCard: ${err}`);
        throw err;
    }
}

//Função que pega todos os cartões ativos de um cliente
module.exports.buscarCartoesAtivosClienteId = async (clt_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `
        select 
            *
        from
            cartoes
        where 
            car_status = 1 and car_clt_id = ?;
    `;
    
    try{
        const [cartoes] = await db.query(sql, clt_id);
        return cartoes;
    }catch(err){
        console.error(`Erro no buscarTodosCartoesAtivos - modelCard: ${err}`);
        throw err;
    }
}

//Função que pega todos os cartões inativos de um cliente
module.exports.buscarCartoesInativosClienteId = async (clt_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `
        select 
            *
        from
            cartoes
        where 
            car_status = 0 and car_clt_id = ?;
    `;
    
    try{
        const [cartoes] = await db.query(sql, clt_id);
        return cartoes;
    }catch(err){
        console.error(`Erro no buscarTodosCartoesInativos - modelCard: ${err}`);
        throw err;
    }
}

//Função que pegar um cartão pelo seu id
module.exports.buscarCartaoId = async (id) =>{
    
    //Obtendo o banco
    const db = await getDb();
    
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
    
    //Obtendo o banco
    const db = await getDb();

    try{
        const [cartoes] = await db.query(`select * from cartoes where car_clt_id = ?`, id);
        return cartoes;
        
    }catch(err){
        console.error(`Erro no buscarCartoesClienteId - modelCard: ${err}`);
        throw err;
    }
}

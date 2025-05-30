const { getDb } = require('../../config/db');

//SELECT 

//Buscando cupons inativos (não usados) por id de cliente
module.exports.buscarCuponsInativosClienteId = async (clt_id) => {
    
    //Obtendo o banco
    const db = await getDb();
    
    try{
        const [cupons] = await db.query(`select * from cupons where cup_clt_id = ? and cup_usado = 0`, clt_id);
        return cupons;

    }catch(err){
        console.error(`Erro no buscarCuponsInativosClienteId - modelPagamento: ${err}`);
        throw err;
    }
};

//Buscando cupons ativos (usados) por id de cliente
module.exports.buscarCuponsAtivosClienteId = async (clt_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    try{
        const [cupons] = await db.query(`select * from cupons where cup_clt_id = ? and cup_usado = 1`, clt_id);
        return cupons;

    }catch(err){
        console.error(`Erro no buscarCuponsAtivosClienteId - modelPagamento: ${err}`);
        throw err;
    }
};

//UPDATE

//Inativando um cupom
module.exports.inativarCupom = async (cup_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `update cupons set cup_usado = 0 where cup_id = ?`
    
    try{
        await db.query(sql, cup_id);
    }catch(err){
        console.error(`Erro no inativarCupom - modelPagamento: ${err}`);
        throw err;
    }
}

//ativando um cupom
module.exports.ativarCupom = async (cup_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `update cupons set cup_usado = 1 where cup_id = ?`;

    try{
        await db.query(sql, cup_id);
    }catch(err){
        console.error(`Erro no ativarCupom - modelPagamento: ${err}`);
        throw err;
    }
}

//DELETE

//Deletando um cupom específico
module.exports.deletarCupomId = async (cup_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = 'delete from cupons where cup_id = ?';

    try{
        const [cupons] = await db.query(sql, cup_id);
        return cupons;
        
    }catch(err){
        console.error(`Erro no deletarCupomId - modelPagamento: ${err}`);
        throw err;
    }
};


//INSERT

//Adicionando cupons no banco de dados
module.exports.adicionarCupom = async (dados) => {

    //Obtendo o banco
    const db = await getDb();

    //Consulta SQL
    const sql = `
    
        INSERT INTO cupons (
            cup_clt_id,
            cup_codigo,
            cup_tipo,
            cup_valor,
            cup_usado
        ) VALUES (
            ?, ?, ?, ?, 0
        );

    `;

    //Valores a serem inseridos no banco
    const valores = [
        dados.cup_clt_id,
        dados.cup_codigo,
        dados.cup_tipo,
        dados.cup_valor
    ]

    //Inserindo os cupons no banco de dados
    try{
        await db.query(sql, valores);
    }catch(err){
        console.error(`Erro no adicionarCupom - modelPagamento: ${err}`);
        throw err;
    } 
    
}


//Função que calcula o Frete com base no cep
module.exports.calcularFreteFicticio = (cep) => {

    // Removendo tudo que não é número
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        return null;
    }

    // Pegando os dois primeiro dígitos do cep
    const faixa = parseInt(cepLimpo.substring(0, 2));

    //Função que gera um valor aleatório de frete dentro de uma faixa
    const gerarValorAleatorio = (min, max) => {
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    };

    // Regra fictícia baseada na "distância"
    if (faixa <= 20) return gerarValorAleatorio(8.50, 13.00);      
    if (faixa <= 50) return gerarValorAleatorio(13.01, 20.00);   
    if (faixa <= 80) return gerarValorAleatorio(20.01, 30.00); 
    return gerarValorAleatorio(30.01, 45.00);                    
}
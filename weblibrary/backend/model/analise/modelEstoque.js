const { getDb } = require('../../config/db');

// INSERT

// Adicionando uma nova entrada no estoque
module.exports.adicionarEstoque = async (dados) => {

    //Obtendo o banco
    const db = await getDb();

    // Insert na tabela de estoque
    const sql = `
        INSERT INTO estoque (
            est_for_id,
            est_lvr_id,
            est_gpp_id,
            est_qtd,
            est_data,
            est_valorCompra,
            est_origem
        ) VALUES (
            ?, ?, ?, ?, CURDATE(), ?, ?
        )
    `;

    //Valores a serem inseridos no banco
    const valores = [
        dados.est_for_id,
        dados.est_lvr_id,
        dados.est_gpp_id,
        dados.est_qtd,
        dados.est_valorCompra,
        dados.est_origem
    ]

    //Inserindo os dados necessários
    try{

        await db.query(sql, valores);

    }catch(err){
        console.error(`Erro no adicionarEstoque - modelEstoque: ${err}`);
        throw err;
    }
        
    
}

//SELECT

//Função que pega os dados do estoque
module.exports.buscarEstoque = async () => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `
    
        select
            e.est_id,
            f.for_id,
            f.for_nome,
            l.lvr_id,
            l.lvr_titulo,
            g.gpp_id,
            g.gpp_nome,
            g.gpp_margemLucro,
            e.est_qtd,
            e.est_data,
            e.est_valorCompra,
            e.est_origem,
            round((((g.gpp_margemLucro / 100) + 1) * e.est_valorCompra), 2) valorVenda
        from 
            estoque e
            join grupo_precificacao g on g.gpp_id = e.est_gpp_id
            join fornecedor f on f.for_id = e.est_for_id
            join livros l on l.lvr_id = e.est_lvr_id
        order by e.est_id desc;
    `;
    
    try{
        const [estoque] = await db.query(sql);
        return estoque;
        
    }catch(err){
        console.error(`Erro no buscarEstoque - modelEstoque: ${err}`);
        throw err;
    }
}

//Buscando todos os fornecedores cadastrados
module.exports.buscarTodosFornecedores = async () => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `
    
        select
            *
        from 
            fornecedor;
    `;
    
    try{
        const [fornecedores] = await db.query(sql);
        return fornecedores;
        
    }catch(err){
        console.error(`Erro no buscarTodosFornecedores - modelEstoque: ${err}`);
        throw err;
    }
}

//Buscando todos os grupos de precificação
module.exports.buscarTodosGrpPrecificacao = async () => {
    
    //Obtendo o banco
    const db = await getDb();

    const sql = `
    
        select
            *
        from 
            grupo_precificacao;
    `;
    
    try{
        const [fornecedores] = await db.query(sql);
        return fornecedores;
        
    }catch(err){
        console.error(`Erro no buscarTodosGrpPrecificacao - modelEstoque: ${err}`);
        throw err;
    }
}
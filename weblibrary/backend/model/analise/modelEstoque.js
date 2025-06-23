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

    //Buscando a view do estoque
    const sql = `
    
        select
            *
        from 
            vw_estoque;
    `;
    
    try{
        let [estoque] = await db.query(sql);
        estoque = estoque.map(est => ({
            ...est,
            est_data: new Date(est.est_data).toLocaleString('pt-BR')
        }));
        return estoque;
        
    }catch(err){
        console.error(`Erro no buscarEstoque - modelEstoque: ${err}`);
        throw err;
    }
}

//Buscando o total de livros no estoque + preço
module.exports.buscarLivrosIdQtdEstoque = async (lvr_id) => {
    
    //Obtendo o banco
    const db = await getDb();

    //Monstando a query
    const sql = `
        select
            lvr_id,
            lvr_titulo,
            sum(est_qtd) tot_estoque,
	        round(sum(((gpp_margemLucro / 100) + 1) * est_valorCompra * est_qtd) / nullif(sum(est_qtd), 0), 2) valor_venda
        from
            vw_estoque
        where
            lvr_id = ?
        group by
            lvr_id,
            lvr_titulo;
    `;

    try{
        const [livros] = await db.query(sql, lvr_id);
        return livros;
        
    }catch(err){
        console.error(`Erro no buscarLivrosQtdEstoque - modelEstoque: ${err}`);
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

//UPDATE
module.exports.atualizarEstoque = async (lvr_id, qtd_comprada) => {

    //Obtendo o banco
    const db = await getDb();

    //Atualizando os dados do estoque
    try{
        //Obtendo todas as linhas do livro comprado
        const [linhasEstoque] = await db.query(
            `select
                est_id,
                est_qtd,
                est_data
            from 
                estoque
            where 
                est_lvr_id = ?
            order by
                est_data asc;
        `, [lvr_id]);

        //Iterando as linhas do estoque para atualizar a qtd
        for (const linha of linhasEstoque){

            if(qtd_comprada <= 0) break;

            if(linha.est_qtd >= qtd_comprada){

                //Atualizando a linha com a qtd_comprada reduzida
                await db.query(`
                    update
                        estoque
                    set
                        est_qtd = est_qtd - ?
                    where 
                        est_id = ?
                    
                `, [qtd_comprada, linha.est_id]);

                qtd_comprada = 0;

            }else{

                //Deletando a linha (consumindo tudo)
                await db.query(`
                    delete from 
                            estoque
                        where
                            est_id = ?
                
                `, [linha.est_id]);

                //Atualizando a qtd_comprada
                qtd_comprada -= linha.est_qtd;
            }
        }        
    }catch(err){
        console.error(`Erro no atualizarEstoque - modelEstoque: ${err}`);
        throw err;
    }
}
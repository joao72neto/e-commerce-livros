const db = require('../../config/db');


//SELECT

//Função que pega os dados do estoque
module.exports.buscarEstoque = async () => {
    
    const sql = `
    
        select
            e.est_id,
            f.for_nome,
            l.lvr_titulo,
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
            join livros l on l.lvr_id = e.est_lvr_id;
    `;
    
    try{
        const [estoque] = await db.query(sql);
        return estoque;
        
    }catch(err){
        console.error(`Erro no buscarEstoque - modelEstoque: ${err}`);
        throw err;
    }
}
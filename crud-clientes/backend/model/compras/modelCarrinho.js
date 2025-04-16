const db = require('../../config/db');
const { buscarClienteLogado } = require('../clientes/modelClientes');

//SELECT

//Trazendo todos os itens do carrinho
module.exports.buscarCarrinhoClienteId = async (clt_id) => {
    try{

        const sql = `
        
            SELECT 
                *
            FROM 
                carrinho c
            JOIN 
                livros l ON l.lvr_id = c.crr_lvr_id
            WHERE 
                c.crr_clt_id = ?;
        `;

        const [carrinho] = await db.query(sql, clt_id);
        return carrinho;
        
    }catch(err){
        console.error(`Erro no buscarCarrinhoClienteId - modelCarrinho: ${err}`);
        throw err;
    }
};

//DELETE

//Removendo itens do carrinho
module.exports.removerCarrinhoId = async (lvr_id) => {
    try{
        const [livros] = await db.query('delete from carrinho where crr_lvr_id = ?', lvr_id);
        return livros;
        
    }catch(err){
        console.error(`Erro no removerCarrinhoId - modelCarrinho: ${err}`);
        throw err;
    }
}


//INSERT

//Inserindo itens no carrinho
module.exports.adicionarCarrinho = async (dados) => {

    //Verificando se há um item no carrinho
    const cliente = await buscarClienteLogado();
    let carrinho = await this.buscarCarrinhoClienteId(cliente[0].clt_id);
    carrinho = carrinho.filter(car => car.crr_lvr_id === Number(dados.lvr_id));


    if(carrinho){
        console.log('O item já está no carrinho');
        return 409;
    }

    const sql = `
        
        INSERT INTO carrinho (
            crr_clt_id,
            crr_lvr_id,
            crr_qtd,
            crr_total,
            crr_adicao,
            crr_status
        ) VALUES (
            ?, ?, ?, ?, NOW(), 'adicionado'
        )
    `;

    //Tratando os valores para inserir no banco
    const valores = [
        dados.clt_id,
        dados.lvr_id,
        dados.crr_qtd,
        dados.crr_total
    ]

    //Adicionando os dados no banco
    try{
        await db.query(sql, valores);
        return 201;
    }catch(err){
        console.error(`Erro no adicionarCarrinho - modelCarrinho: ${err}`);
        throw err;
    }
}

//UPDATE

//Função para atualizar o preço e a qtd do item do carrinho
module.exports.atualizarQtdPrecoCarrinho = async (crr_qtd, lvr_id) => {

    //Obtendo os dados
    const cliente = await buscarClienteLogado();
    const clt_id = cliente[0].clt_id;
    const carrinho = await this.buscarCarrinhoClienteId(clt_id);
    const livro = carrinho.find(livro => livro.lvr_id === lvr_id);

    const sql = `
        
        UPDATE 
            carrinho
            SET crr_total = ?, crr_qtd = ?
        WHERE
            crr_lvr_id = ?;
    `;

    //Tratando os valores para inserir no banco
    const valores = [
        livro.lvr_preco * crr_qtd,
        crr_qtd,
        lvr_id
    ];

    //Adicionando os dados no banco
    try{
        await db.query(sql, valores);
    }catch(err){
        console.error(`Erro no atualizarQtdPrecoCarrinho - modelCarrinho: ${err}`);
        throw err;
    }
}

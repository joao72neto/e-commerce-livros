const { getDb } = require('../../config/db');
const { buscarClienteLogado } = require('../clientes/modelClientes');
const { registerNotification } = require('../../model/clientes/modelNotifications');

//Notification model
let notData = {
    not_clt_id: '',
    not_title: '',
    not_msg: '',
    not_status: 0
}

//SELECT

//Trazendo todos os itens do carrinho
module.exports.buscarCarrinhoClienteId = async (clt_id) => {
    
    //Obtendo o banco
    const db = await getDb();
    
    //Preparing query to show cart items
    const sql = `
        SELECT
            *
        FROM
            carrinho c
        JOIN
            livros l ON l.lvr_id = c.crr_lvr_id
        WHERE
            c.crr_clt_id = ?
        ORDER BY
            c.crr_id desc;
    `;

    //Preparing query to get expiration date
    const sql_expiration = `
        select
            max(crr_expiration) expiration
        from
            carrinho
        where
            crr_clt_id = ?
        group by
            crr_clt_id;
    `;

    try{

        //Deleting cart based on expiration date
        const [date] = await db.query(sql_expiration, clt_id);

        if(date.length > 0){
            const expiration = new Date(date[0].expiration);
            const now = new Date();

            if(expiration <= now){
                await db.query(`
                    delete from
                        carrinho
                    where
                        crr_clt_id = ?
                `, [clt_id]);

                //Registering notification
                notData.not_title = 'Itens removidos do carrinho 🛒';
                notData.not_msg = `Seus itens foram removidos do carrinho após 15 minutos de inatividade. Mas não se preocupe, você pode adicioná-los novamente a qualquer momento!`;
                await registerNotification(notData);
            }
        }
        
        //Returning cart
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
    
    //Obtendo o banco
    const db = await getDb();
    
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

    //Obtendo o banco
    const db = await getDb();

    //Verificando se há um item no carrinho
    const cliente = await buscarClienteLogado();
    let carrinho = await this.buscarCarrinhoClienteId(cliente[0].clt_id);
    carrinho = carrinho.filter(car => car.crr_lvr_id === Number(dados.lvr_id));


    if(carrinho.length > 0){
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
            crr_status,
            crr_expiration,
            crr_warned
        ) VALUES (
            ?, ?, ?, ?, NOW(), 'adicionado', DATE_ADD(NOW(), INTERVAL 15 MINUTE), 0
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

    //Obtendo o banco
    const db = await getDb();

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

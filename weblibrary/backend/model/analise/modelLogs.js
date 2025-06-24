const { getDb } = require('../../config/db');
const { buscarClienteLogado } = require('../../model/clientes/modelClientes');

//SELECT

//Getting all logs from the database
module.exports.buscarTodosLogs = async () => {
    
    //Setting up the db
    const db = await getDb();

    let sql = `
        select 
            log_id,
            log_dataHora,
            log_usuario,
            log_operacao,
            log_desc
        from 
            log
        order by
            log_id desc;
    `;

    try{
        let [logs] = await db.query(sql);
        logs = logs.map(log => ({
            ...log,
            log_dataHora: new Date(log.log_dataHora).toLocaleString('pt-BR')
        }));
        
        return logs;
        
    }catch(err){
        console.error(`Erro no buscarTodosLogs - modelLogs: ${err}`);
        throw err;
    }
}

//INSERT

//Registering logs
module.exports.registerLog = async (dados) => {

    //Setting up db
    const db = await getDb();

    //Getting the logged in user
    const client = await buscarClienteLogado();
    dados.log_clt_id = client[0].clt_id;
    dados.log_usuario += dados.log_usuario === 'System' ? '' : client[0].clt_nome;

    //Preparing sql query
    const sql = `
        INSERT INTO log (
            log_clt_id,
            log_dataHora,
            log_usuario,
            log_operacao,
            log_desc
        ) VALUES (
            ?, NOW(), ?, ?, ?
        )
    `;

    //Preparing values to be inserted
    const valores = Object.values(dados);

    //Inserting the data into the db
    try{
        await db.query(sql, valores);
    }catch(err){
        console.error(`Erro no registerLog - modelLogs: ${err}`);
        throw err;
    }
}
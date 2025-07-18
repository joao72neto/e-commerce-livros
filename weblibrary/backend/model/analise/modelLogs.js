const { getDb } = require('../../config/db');
const { buscarClienteLogado } = require('../../model/clientes/modelClientes');

//SELECT

//Getting all logs from the database
module.exports.buscarTodosLogs = async () => {
    
    //Setting up the db
    const db = await getDb();

    let sql = `
        select 
            hlog_id,
            hlog_dataHora,
            hlog_usuario,
            hlog_operacao,
            hlog_desc
        from 
            log_history
        order by
            hlog_id desc;
    `;

    try{
        let [logs] = await db.query(sql);
        logs = logs.map(log => ({
            ...log,
            hlog_dataHora: new Date(log.hlog_dataHora).toLocaleString('pt-BR')
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
    const sql_log = `
        INSERT INTO log (
            log_clt_id,
            log_dataHora,
            log_usuario,
            log_operacao,
            log_desc
        ) VALUES (
            ?, NOW(), ?, ?, ?
        );
    `;

    //Preparing values to be inserted
    const valores = Object.values(dados);

    //Inserting the data into the db
    try{
        const [result] = await db.query(sql_log, valores);
        const lastId = result.insertId;
        await db.query('CALL seed_log_history(?)', [lastId]);

    }catch(err){
        console.error(`Erro no registerLog - modelLogs: ${err}`);
        throw err;
    }
}
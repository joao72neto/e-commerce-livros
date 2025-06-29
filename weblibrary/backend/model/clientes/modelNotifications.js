const { getDb } = require('../../config/db');
const { buscarClienteLogado } = require('../../model/clientes/modelClientes');

//SELECT

//Getting unread notifications from db
module.exports.buscarUnreadNotifications = async () => {

    //Setting up the db
    const db = await getDb();

    let sql = `
        select
            *
        from
            notifications
        where
            not_status = 0
        order by
            not_datetime desc;
    `;

    try{
        let [nots] = await db.query(sql);
        nots = nots.map(ntf => ({
            ...ntf,
            hlog_dataHora: new Date(ntf.not_datetime).toLocaleString('pt-BR')
        }));

        return nots;

    }catch(err){
        console.error(`Erro no buscarUnreadNotifications - modelNotifications: ${err}`);
        throw err;
    }
}

//INSERT

//Registering notifications
module.exports.registerNotification = async (dados) => {

    //Setting up db
    const db = await getDb();

    //Getting the logged in user
    const client = await buscarClienteLogado();
    dados.not_clt_id = client[0].clt_id;

    //Preparing sql query
    const sql = `
        INSERT INTO notifications (
            not_clt_id,
            not_datetime,
            not_title,
            not_msg,
            not_status
        ) VALUES (
            ?, NOW(), ?, ?, ?
        );
    `;

    //Preparing values to be inserted
    const valores = Object.values(dados);

    //Inserting the data into the db
    try{
        await db.query(sql, valores);
    }catch(err){
        console.error(`Erro no registerNotification - modelNotifications: ${err}`);
        throw err;
    }
}
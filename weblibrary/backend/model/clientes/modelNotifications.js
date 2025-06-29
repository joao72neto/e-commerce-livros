const { getDb } = require('../../config/db');
const { buscarClienteLogado } = require('../../model/clientes/modelClientes');

//SELECT

//Getting unread notifications from db
module.exports.buscarUnreadNotifications = async (clt_id) => {

    //Setting up the db
    const db = await getDb();

    let sql = `
        select
            *
        from
            notifications
        where
            not_status = 0 and not_clt_id = ?
        order by
            not_datetime desc;
    `;

    try{
        let [nots] = await db.query(sql, clt_id);
        nots = nots.map(ntf => ({
            ...ntf,
            not_datetime: new Date(ntf.not_datetime).toLocaleString('pt-BR')
        }));

        return nots;

    }catch(err){
        console.error(`Erro no buscarUnreadNotifications - modelNotifications: ${err}`);
        throw err;
    }
}

//UPDATE

//Getting unread notifications from db
module.exports.markNotificationAsRead = async (not_id) => {

    //Setting up the db
    const db = await getDb();

    let sql = `
        update
            notifications
            set not_status = 1
        where
            not_id = ?;
    `;

    try{
        await db.query(sql, not_id);
    }catch(err){
        console.error(`Erro no markNotificationAsRead - modelNotifications: ${err}`);
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

//Function to update notification status
module.exports.sendNotifcation = async (data) => {

    //Sending notification
    let notData = {
        not_clt_id: '',
        not_title: '',
        not_msg: '',
        not_status: 0
    }

    const pedido = `Pedido nº ${data.ped_number}`;

    switch(data.vnd_status){
        case 'Em Processamento':
            notData.not_title = 'Estamos cuidando do seu pedido 🛠️';
            notData.not_msg = `${pedido} está em processamento. Estamos preparando tudo com carinho!`;
            break;
        case 'Reprovado':
            notData.not_title = 'Ops! Problema no pedido ❌';
            notData.not_msg = `${pedido} não foi aprovado. Verifique os dados ou entre em contato para mais informações.`;
            break;
        case 'Cancelado':
            notData.not_title = 'Pedido cancelado 🛑';
            notData.not_msg = `${pedido} foi cancelado. Caso queira refazer a compra, estamos por aqui!`;
            break;
        case 'Aprovado':
            notData.not_title = 'Pedido aprovado! 🎉';
            notData.not_msg = `${pedido} foi aprovado com sucesso. Logo ele será enviado!`;
            break;
        case 'Em Transporte':
            notData.not_title = 'Seu pedido está a caminho 🚚';
            notData.not_msg = `${pedido} já foi enviado e está em rota de entrega. Fique atento!`;
            break;
        case 'Entregue':
            notData.not_title = 'Pedido entregue 📦';
            notData.not_msg = `${pedido} foi entregue com sucesso. Esperamos que esteja satisfeito!`;
            break;
        case 'Devolução Solicitada':
            notData.not_title = 'Solicitação de devolução recebida 🔁';
            notData.not_msg = `Recebemos sua solicitação de devolução para o ${pedido}. Estamos analisando o pedido.`;
            break;
        case 'Devolução Recusada':
            notData.not_title = 'Devolução recusada ❗';
            notData.not_msg = `Infelizmente, a devolução do ${pedido} foi recusada. Entre em contato para mais detalhes.`;
            break;
        case 'Devolução Aceita':
            notData.not_title = 'Devolução aprovada ✅';
            notData.not_msg = `Sua devolução referente ao ${pedido} foi aprovada. Em breve você receberá as instruções.`;
            break;
        case 'Devolução Concluída':
            notData.not_title = 'Devolução concluída 🔄';
            notData.not_msg = `Processo de devolução do ${pedido} finalizado com sucesso.`;
            break;
        case 'Troca Solicitada':
            notData.not_title = 'Solicitação de troca recebida 🔃';
            notData.not_msg = `Recebemos a solicitação de troca do ${pedido}. Analisaremos e avisaremos você!`;
            break;
        case 'Troca Recusada':
            notData.not_title = 'Troca recusada ❌';
            notData.not_msg = `Sua troca do ${pedido} foi recusada. Caso necessário, entre em contato com nosso suporte.`;
            break;
        case 'Troca Aceita':
            notData.not_title = 'Troca aprovada! 🆗';
            notData.not_msg = `A troca do ${pedido} foi aprovada. Preparando tudo para enviar o novo produto!`;
            break;
        case 'Troca Concluída':
            notData.not_title = 'Troca concluída com sucesso 🔁';
            notData.not_msg = `A troca do ${pedido} foi finalizada. Esperamos que esteja satisfeito com o novo item!`;
            break;
    }

    module.exports.registerNotification(notData);
}
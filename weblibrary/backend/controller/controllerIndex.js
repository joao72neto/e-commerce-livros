const { buscarClienteLogado } = require('../model/clientes/modelClientes');
const { buscarLivrosIndex } = require('../model/books/modelBooks');
const { buscarUnreadNotifications } = require('../model/clientes/modelNotifications');
const { markNotificationAsRead } = require('../model/clientes/modelNotifications');

//Página
module.exports.getIndex = async (req, res) => {
    const livros = await buscarLivrosIndex(req.query.book);
    const cliente = await buscarClienteLogado();

    if(cliente.length > 0){
        return res.render('index/indexLogado', {
            livros: livros, 
            cliente: cliente
        });
    }
    return res.render('index/index', {livros: livros});
};

//Update
module.exports.patchMarkNotificationAsRead = async (req, res) => {
    try{
        await markNotificationAsRead(req.params.not_id);
        return res.json({msg: 'Msg marcada como lida'});
    }catch(err){
        console.error(`Erro no patchMarkNotificationAsRead - controllerIndex: ${err}`);
        return res.status(500).json({msg: 'Não foi possível marcar notificação como lida'});
    }
};

//APIs
module.exports.getApiNotifications = async (req, res) => {
    const notifications = await buscarUnreadNotifications(req.params.clt_id);
    return res.json(notifications);
};

//Resetar histórico IA
const BOOT_TIMESTAMP = Date.now();

module.exports.getServerVersion = (req, res) => {
    res.send(String(BOOT_TIMESTAMP));
}


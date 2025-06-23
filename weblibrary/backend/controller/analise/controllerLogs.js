const { buscarTodosLogs } = require('../../model/analise/modelLogs');

//Página
module.exports.getLogs = async (req, res) => {
    const logs = await buscarTodosLogs();
    return res.render('analise/logs', {logs: logs});
};

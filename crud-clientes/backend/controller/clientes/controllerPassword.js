const { alterarSenhaCliente } = require("../../model/clientes/modelClientes");

//Páginas
module.exports.getPassword = (req, res) => {
    res.render('clientes/password');
};

//Alterando senha
module.exports.patchPassword =  async (req, res) => {
    try{
        await alterarSenhaCliente(req.body, req.params.clt_id);
        res.sendStatus(204);
    }catch(err){
        console.error(`Erro no patchPassword - controllerPassword ${err}`);
        res.sendStatus(500);
    }
};
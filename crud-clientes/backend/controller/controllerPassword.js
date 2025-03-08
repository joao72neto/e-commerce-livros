const { alterarSenhaCliente } = require("../model/modelClientes");

//Páginas
module.exports.getPassword = (req, res) => {
    res.render('password');
};

//Alterando senha
module.exports.patchPassword =  async (req, res) => {
    try{
        await alterarSenhaCliente(req.body, req.params.clt_id);
        res.sendStatus(204);
    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }
};
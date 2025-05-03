const { alterarSenhaCliente, buscarClienteId } = require("../../model/clientes/modelClientes");
const bcrypt = require('bcrypt');

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

//Comparando senha
module.exports.postCompararSenha = async (req, res) => {

    try{

        const cliente = await buscarClienteId(req.params.clt_id);

        if(!cliente){
            res.status(404).json({msg: 'Cliente não encontrado'});
            return;
        }

        if(await bcrypt.compare(req.body.clt_senha, cliente[0].clt_senha)){
            res.status(200).json({msg: 'Senha bate com a cadastrada'});
            return;
        }

        res.status(400).json({msg: 'Senha não bate com a cadastrada'});

    }catch(err){
        console.error(`Erro no postCompararSenha - controllerPassword ${err}`);
        res.status(500).json({msg: 'Erro interno no servidor'});
    }
};  
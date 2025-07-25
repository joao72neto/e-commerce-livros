const { alterarSenhaCliente, buscarClienteId } = require("../../model/clientes/modelClientes");
const { registerLog } = require('../../model/analise/modelLogs');
const bcrypt = require('bcryptjs');

//Páginas
module.exports.getPassword = (req, res) => {
    return res.render('clientes/password');
};

//Log model
let logData = {
    log_clt_id: '',
    log_usuario: '',
    log_operacao: '',
    log_desc: ''
}

//Alterando senha
module.exports.patchPassword =  async (req, res) => {
    try{

        await alterarSenhaCliente(req.body, req.params.clt_id);

        //Registering log
        const client = await buscarClienteId(req.params.clt_id);
        const userName = client[0].clt_nome;
        logData.log_usuario = '(Admin) ';
        logData.log_operacao = 'UPDATE';
        logData.log_desc = `Senha de "${userName}" alterada`;
        await registerLog(logData);

        return res.sendStatus(204);

    }catch(err){
        console.error(`Erro no patchPassword - controllerPassword ${err}`);
        return res.sendStatus(500);
    }
};

//Comparando senha
module.exports.postCompararSenha = async (req, res) => {

    try{

        const cliente = await buscarClienteId(req.params.clt_id);

        if(!cliente){
            return res.status(404).json({msg: 'Cliente não encontrado'});
        }

        if(await bcrypt.compare(req.body.clt_senha, cliente[0].clt_senha)){
            return res.status(200).json({msg: 'Senha bate com a cadastrada'});
        }

        return res.status(400).json({msg: 'Senha não bate com a cadastrada'});

    }catch(err){
        console.error(`Erro no postCompararSenha - controllerPassword ${err}`);
        return res.status(500).json({msg: 'Erro interno no servidor'});
    }
};  
const { resetarBanco } = require('../../model/reset/modelReset');

//Recriando a estrutura de dados
module.exports.postResetarDatabase = async (req, res) => {
    try{
        
        await resetarBanco();
        res.status(200).json({msg: 'Banco resetado com sucesso!'});

    }catch(err){
        console.error(`Erro no postResetarDatabase - controllerReset: ${err}`);
        res.status(500).json({msg: 'Não foi possível resetar o banco'});
    }
};

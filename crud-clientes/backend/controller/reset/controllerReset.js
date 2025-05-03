const { resetarBanco } = require('../../model/reset/modelReset');
const { povoarBanco } = require('../../model/reset/modelReset');
const { resetarPovoarBanco } = require('../../model/reset/modelReset');

//Resetando o banco de dados
module.exports.postResetarBanco = async (req, res) => {
    try{
        
        await resetarBanco();
        res.status(200).json({msg: 'Banco resetado com sucesso!'});

    }catch(err){
        console.error(`Erro no postResetarDatabase - controllerReset: ${err}`);
        res.status(500).json({msg: 'Não foi possível resetar o banco'});
    }
};

module.exports.postPovoarBanco = async (req, res) => {
    try{
        
        await povoarBanco();
        res.status(200).json({msg: 'Banco povoado com sucesso!'});

    }catch(err){
        console.error(`Erro no postPovoarBanco - controllerReset: ${err}`);
        res.status(500).json({msg: 'Não foi possível povoar o banco'});
    }
};

module.exports.postResetarPovoarBanco = async (req, res) => {
    try{
        
        await resetarPovoarBanco();
        res.status(200).json({msg: 'Banco resetado e povoado com sucesso!'});

    }catch(err){
        console.error(`Erro no postResetarPovoarBanco - controllerReset: ${err}`);
        res.status(500).json({msg: 'Não foi possível resetar e povoar o banco'});
    }
};



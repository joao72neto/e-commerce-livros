const { resetarPovoarBanco } = require('../backend/model/database/modelReset');

//Executando a função para resetar o banco
(async () => {
    try{
        await resetarPovoarBanco();
        console.log('Banco de dados resetado e povoado!');
        process.exit(0);
    }catch(err){
        console.error(`Erro ao resetar/povoar banco: ${err}`);
        process.exit(1);
    }
})();
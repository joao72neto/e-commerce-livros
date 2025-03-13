//Testando a conexão com o banco de dados
const db = require('../../../backend/config/db');

test('Conexão com o banco de dados', async () => {
    try{
        const [rows] = await db.query('select 1');
        await db.end();
        expect(rows).toBeDefined();
    }catch(err){
        throw new Error('Falha na conexão com banco de dados')
    }
});


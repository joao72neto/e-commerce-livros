//Inserindo um cliente no banco de dados
export async function cadastrarClienteService(cliente) {
    try{

        const res = await fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
        });

        return res.status;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}
//PUT

//Atualizando dados de um cliente do banco de dados
export async function signupAltService(cliente, clt_id) {
    try{

        const res = await fetch(`/signup/${clt_id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
        });

        return res.status;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//POST

//Inserindo um cliente no banco de dados
export async function signupService(cliente) {
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
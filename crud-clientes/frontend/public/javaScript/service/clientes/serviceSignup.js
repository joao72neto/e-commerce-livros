//PUT

//Atualizando dados de um cliente do banco de dados
export async function signupAltService(cliente, clt_id) {
    try{

        const res = await fetch(`/clientes/signup/${clt_id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
        });

        return res.status;

    }catch(err){
        console.error(`Erro no signupAltService - serviceSignup: ${err}`);
        throw err;
    }
}

//POST

//Inserindo um cliente no banco de dados
export async function signupService(cliente) {
    try{

        const res = await fetch('/clientes/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
        });

        return res.status;

    }catch(err){
        console.error(`Erro no signupService - serviceSignup: ${err}`);
        throw err;
    }
}
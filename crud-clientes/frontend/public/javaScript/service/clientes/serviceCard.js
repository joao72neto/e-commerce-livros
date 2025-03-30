//DELETE

//Deletando um cartão por ID do banco de dados
export async function deletarCardIdService(clt_id, car_id) {
    try{
        const result = await fetch(`/card/delete/${clt_id}/${car_id}`, {
           method: 'DELETE'
        });

        if(result.status === 400){
            return {status: result.status, msg: await result.json()};
        }

        return {status: result.status};

    }catch(err){
        console.error(`Erro no deletarCardIdService - serviceCard: ${err}`);
        throw err;
    }
}

//POST

//Cadastrando um cartão no banco de dados
export async function cadastrarCardService(dados, clt_id) {
    try{
        const result = await fetch(`/clientes/card/${clt_id}/add`, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(dados) 
        });

        return result;

    }catch(err){
        console.error(`Erro no cadastrarCardService - serviceCard: ${err}`);
        throw err;
    }
}

//PUT

//Atualizando os cartões do banco de dados
export async function atualizarCardService(dados, clt_id, car_id) {
    try{
        const result = await fetch(`/clientes/card/${clt_id}/alt/${car_id}`, {
           method: 'PUT',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(dados) 
        });

        return result;

    }catch(err){
        console.error(`Erro no atualizarCardService - serviceCard: ${err}`);
        throw err;
    }
}

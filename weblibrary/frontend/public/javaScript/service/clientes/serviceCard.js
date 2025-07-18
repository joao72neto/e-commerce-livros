//DELETE

//Deletando um cartão por ID do banco de dados
export async function deletarCardIdService(clt_id, car_id, user) {
    try{
        const result = await fetch(`/card/delete/${clt_id}/${car_id}`, {
           method: 'DELETE',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify({user: user})
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
export async function cadastrarCardService(dados, user, clt_id) {
    try{
        const data = {
            card: dados,
            user: user
        }
        const result = await fetch(`/clientes/card/${clt_id}/add`, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(data)
        });

        return result;

    }catch(err){
        console.error(`Erro no cadastrarCardService - serviceCard: ${err}`);
        throw err;
    }
}

//PUT

//Atualizando os cartões do banco de dados
export async function atualizarCardService(card, user, clt_id, car_id) {
    try{
        const dados = {
            card: card,
            user: user
        }
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

//PATCH

//Desativando os cartões de um determinado cliente
export async function desativarCartoesClienteIdService(clt_id) {
    try{
        const result = await fetch(`/clientes/card/desativar/${clt_id}`, {
           method: 'PATCH'
        });

        return result.status;

    }catch(err){
        console.error(`Erro no desativarCartoesClienteIdService - serviceCard: ${err}`);
        throw err;
    }
}

//Updating deafult card status
export async function updateDefaulCardService(data) {
    try{
        const result = await fetch(`/card/default/update`, {
           method: 'PATCH',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(data)
        });

        return result.status;

    }catch(err){
        console.error(`Erro no updateDefaulCardService - serviceCard: ${err}`);
        throw err;
    }
}


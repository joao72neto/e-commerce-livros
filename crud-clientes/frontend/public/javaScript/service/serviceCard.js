//POST

//Cadastrando um cartão no banco de dados
export async function cadastrarCardService(dados, clt_id) {
    try{
        const result = await fetch(`/card/${clt_id}/add`, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(dados) 
        });

        return result;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}


//PUT

//Atualizando os cartões do banco de dados
export async function atualizarCardService(dados, clt_id, car_id) {
    try{
        const result = await fetch(`/card/${clt_id}/alt/${car_id}`, {
           method: 'PUT',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(dados) 
        });

        return result;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

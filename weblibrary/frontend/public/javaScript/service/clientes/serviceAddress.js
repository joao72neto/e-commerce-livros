//DELETE

//Deletando um endereço por ID do banco de dados
export async function deletarAddressIdService(clt_id, end_id) {
    try{
        const result = await fetch(`/address/delete/${clt_id}/${end_id}`, {
           method: 'DELETE'
        });

        if(result.status === 400){
            return {status: result.status, msg: await result.json()};
        }

        return {status: result.status};

    }catch(err){
        console.error(`Erro no deletarAddressIdService - serviceAddress: ${err}`);
        throw err;
    }
}

//POST

//Cadastro de novos endereço no banco
export async function cadastrarAddressService(dados, clt_id) {
    try{
        const result = await fetch(`/clientes/address/${clt_id}/add`, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(dados) 
        });

        return result;

    }catch(err){
        console.error(`Erro no cadastrarAddressService - serviceAddress: ${err}`);
        throw err;
    }
}


//PUT

//Atualizando os endereço no banco de dados
export async function atualizarAddressService(dados, clt_id, end_id) {
    try{
        const result = await fetch(`/clientes/address/${clt_id}/alt/${end_id}`, {
           method: 'PUT',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(dados) 
        });

        return result;

    }catch(err){
        console.error(`Erro no atualizarAddressService - serviceAddress: ${err}`);
        throw err;
    }
}

//GET

//Pegando enderecos por id
export async function buscarEnderecoIdService(id) {
    try{

        const res = await fetch(`/api/address/${id}`);
        const endereco = await res.json();
        return endereco[0];

    }catch(err){
        console.error(`Erro no buscarEnderecoIdService - serviceAddress: ${err}`);
        throw err;
    }
}

//PATCH

//Desativando a endereço ativo
export async function desativarEnderecosClienteIdService(clt_id) {
    try{
        const result = await fetch(`/clientes/address/desativar/${clt_id}`, {
           method: 'PATCH'
        });

        return result.status;

    }catch(err){
        console.error(`Erro no desativarEnderecosClienteIdService - serviceAddress: ${err}`);
        throw err;
    }
}


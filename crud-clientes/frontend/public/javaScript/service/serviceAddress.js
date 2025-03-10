//POST

//Cadastro de novos endereço no banco
export async function cadastrarAddressService(dados, clt_id) {
    try{
        const result = await fetch(`/address/${clt_id}/add`, {
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

//Atualizando os endereço no banco de dados
export async function atualizarAddressService(dados, clt_id, end_id) {
    try{
        const result = await fetch(`/address/${clt_id}/alt/${end_id}`, {
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

//GET

//Pegando enderecos por id
export async function buscarEnderecoIdService(id) {
    try{

        const res = await fetch(`/api/address/${id}`);
        const endereco = await res.json();
        return endereco[0];

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}
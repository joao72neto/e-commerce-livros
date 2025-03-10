//PATCH

//Alterando a senha do cliente
export async function alterarSenhaClienteService(senha, id) {
    try{
        let res = await fetch(`/password/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(senha)
        });
        
        return res.status;

    }catch(err){
        console.error(`Erro: ${err}`);
        return 500;
    }
}

//Inativando um cliente específico
export async function inativarClienteService(id) {
    try{
        let res = await fetch(`/clientes/inativar/${id}`, {method: 'PATCH'});
        return res.status;

    }catch(err){
        console.error(`Erro: ${err}`);
        return 500;
    }
    
}

//Ativando um cliente específico
export async function ativarClienteService(id) {
    try{
        let res = await fetch(`/clientes/ativar/${id}`, {method: 'PATCH'});
        return res.status;

    }catch(err){
        console.error(`Erro: ${err}`);
        return 500;
    }
    
}

//GET

//Pegando clientes por id
export async function buscarClienteIdService(id) {
    try{

        const res = await fetch(`/api/clientes/id/${id}`);
        const cliente = await res.json();
        return cliente[0];

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Pegando clientes ativos
export async function buscarClientesAtivosService() {
    try{

        const res = await fetch(`/api/clientes/ativos`);
        const clientes = await res.json();
        return clientes;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Pegando clientes inativos
export async function buscarClientesInativosService() {
    try{

        const res = await fetch(`/api/clientes/inativos`);
        const clientes = await res.json();
        return clientes;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}



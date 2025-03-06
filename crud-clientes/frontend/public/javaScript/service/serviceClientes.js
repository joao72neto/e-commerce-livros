
//PATCH

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
export async function pegarClienteId(id) {
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
export async function pegarClientesAtivos() {
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
export async function pegarClientesInativos() {
    try{

        const res = await fetch(`/api/clientes/inativos`);
        const clientes = await res.json();
        return clientes;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}



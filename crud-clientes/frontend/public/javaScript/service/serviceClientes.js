//Pegando todos os clientes do banco de dados
export async function pegarTodosClientes() {
    try{

        const res = await fetch('/api/clientes');
        const clientes = await res.json();
        return clientes;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

//Pegando clientes por id
export async function pegarClientesId(id) {
    try{

        const res = await fetch(`/api/clientes/${id}`);
        const clientesId = await res.json();
        return clientesId;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}
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

//Pegando todos as transacoes dos clientes
export async function pegarTodasTransacoes() {
    try{

        const res = await fetch('/api/transacoes');
        const transacoes = await res.json();
        return transacoes;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}





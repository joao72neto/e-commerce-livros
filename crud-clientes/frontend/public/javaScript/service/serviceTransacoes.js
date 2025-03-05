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

//Pegando transações por id
export async function pegarTransacoesClienteId(id) {
    try{

        const res = await fetch(`/api/transacoes/${id}`);
        const transacoes = await res.json();
        return transacoes;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}


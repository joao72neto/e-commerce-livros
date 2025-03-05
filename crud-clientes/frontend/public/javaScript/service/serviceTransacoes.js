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

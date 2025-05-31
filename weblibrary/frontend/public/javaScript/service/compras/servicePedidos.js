//POST

//Adicionando pedidos na tabela de vendas
export async function adicionarPedidoService(dados) {
    try{

        const res = await fetch('/pedidos/add', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dados)
        });


        if(!res.ok){
            const erros = await res.json();
            return {status: res.status, erros: erros};
        }

        return {status: res.status};


    }catch(err){
        console.error(`Erro no adicionarPedidoService - servicePedido: ${err}`);
        throw err;
    }
}


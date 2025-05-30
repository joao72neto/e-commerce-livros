//PATCH 

//Atualizando o status de um pedido
export async function atualizarStatusPedidoIdService(dados) {
    try{
        let res = await fetch(`/pedidos/status/update`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dados)
        });
        
        return res.status;

    }catch(err){
        console.error(`Erro no atualizarStatusPedidoIdService - serviceGerenciarPedidos: ${err}`);
        return 500;
    }
}

//POST

//Inserindo um produto na tabela de troca ou devolução
export async function devolverTrocarProdutoService(dados) {
    try{
        const result = await fetch(`/pedidos/devolverTrocar`, {
           method: 'POST',
           headers: {'Content-Type':'application/json'},
           body: JSON.stringify(dados) 
        });

        return result.status;

    }catch(err){
        console.error(`Erro no devolverTrocarProdutoService - serviceGerenciarPedidos: ${err}`);
        throw err;
    }
}

//DELETE
export async function deletarDevolvidoTrocadoService(vnd_id) {
    try{
        const res = await fetch(`/pedidos/devolverTrocar/deletar/${vnd_id}`, {
           method: 'DELETE'
        });

        return res.status;

    }catch(err){
        console.error(`Erro no deletarDevolvidoTrocadoService - serviceGerenciarPedidos: ${err}`);
        throw err;
    }
}
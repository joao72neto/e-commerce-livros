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
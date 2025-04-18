//Removendo do carrinho
export async function deletarCupomIdService(cup_id) {
    try{
        const result = await fetch(`/cupom/delete/${cup_id}`, {
           method: 'DELETE'
        });

        if(!result.ok){
            return {status: result.status, msg: await result.json()};
        }

        return {status: result.status};

    }catch(err){
        console.error(`Erro no deletarCupomIdService - servicePagamento: ${err}`);
        throw err;
    }
}
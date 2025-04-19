//DELETE

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

//UPDATE

//Inativando um cupom por id
export async function inativarCupomService(cup_id) {
    try{
        let res = await fetch(`/cupom/inativar/${cup_id}`, {method: 'PATCH'});
        return res.status;

    }catch(err){
        console.error(`Erro no inativarCupomService - servicePagamento: ${err}`);
        return 500;
    }
    
}

//Ativando um cupom por id
export async function ativarCupomService(cup_id) {
    try{
        let res = await fetch(`/cupom/ativar/${cup_id}`, {method: 'PATCH'});
        return res.status;

    }catch(err){
        console.error(`Erro no ativarClupomService - servicePagamento: ${err}`);
        return 500;
    }
    
}
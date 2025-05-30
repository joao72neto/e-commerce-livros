//GET

//Pegando cupons ativos
export async function buscarCuponsAtivosClienteIdService(clt_id) {
    try{

        const res = await fetch(`/api/cupons/ativos/${clt_id}`);
        const cupons = await res.json();
        return cupons;

    }catch(err){
        console.error(`Erro no buscarCuponsAtivosClienteIdService - servicePagamento: ${err}`);
        throw err;
    }
}

//Pegando cupons inativos
export async function buscarCuponsInativosClienteIdService(clt_id) {
    try{

        const res = await fetch(`/api/cupons/inativos/${clt_id}`);
        const cupons = await res.json();
        return cupons;

    }catch(err){
        console.error(`Erro no buscarCuponsInativosClienteIdService - servicePagamento: ${err}`);
        throw err;
    }
}

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

//PATCH

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

//POST

//Adicionando um cupom 
export async function adicionarCupomService(dados) {
    try{

        const res = await fetch('/cupom/add', {
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
        console.error(`Erro no adicionarCupomService - servicePagamento: ${err}`);
        throw err;
    }
}
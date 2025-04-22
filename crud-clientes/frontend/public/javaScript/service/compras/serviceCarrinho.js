//GET

//Pegando os dados do carrinho de um cliente específico
export async function buscarCarrinhoClienteIdService(clt_id) {
    try{

        const res = await fetch(`/api/carrinho/${clt_id}`);
        const carrinho = await res.json();
        return carrinho;

    }catch(err){
        console.error(`Erro no buscarCarrinhoClienteIdService - serviceCarrinho: ${err}`);
        throw err;
    }
}

//POST

//Inserindo um item no carrinho
export async function adicionarCarrinhoService(dados) {
    try{

        const res = await fetch('/carrinho/add', {
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
        console.error(`Erro no adicionarCarrinhoService - serviceCarrinho: ${err}`);
        throw err;
    }
}

//DELETE

//Removendo do carrinho
export async function removerCarrinhoIdService(lvr_id) {
    try{
        const result = await fetch(`/carrinho/delete/${lvr_id}`, {
           method: 'DELETE'
        });

        if(!result.ok){
            return {status: result.status, msg: await result.json()};
        }

        return {status: result.status};

    }catch(err){
        console.error(`Erro no removerCarrinhoIdService - serviceCarrinho: ${err}`);
        throw err;
    }
}

//PATCH

//Atualizando qtd e preço do carrinho
export async function atualizarQtdPrecoCarrinhoService(dados) {
    try{
        let res = await fetch(`/carrinho/update`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dados)
        });
        
        return res.status;

    }catch(err){
        console.error(`Erro no logarClienteIdService - serviceClientes: ${err}`);
        return 500;
    }
}
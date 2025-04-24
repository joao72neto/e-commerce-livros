//POST

//Adicionando nova entrada no estoque
export async function adicionarEstoqueService(dados) {
    try{

        const res = await fetch('/estoque/entrada/add', {
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
        console.error(`Erro no adicionarEstoqueService - serviceEstoque: ${err}`);
        throw err;
    }
}
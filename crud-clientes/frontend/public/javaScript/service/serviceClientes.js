
//Pegando clientes por id
export async function pegarClientesId(id) {
    try{

        const res = await fetch(`/api/clientes/${id}`);
        const cliente = await res.json();
        return cliente;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}
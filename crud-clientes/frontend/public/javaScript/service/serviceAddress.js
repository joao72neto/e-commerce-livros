//Pegando enderecos por id
export async function pegarEnderecoId(id) {
    try{

        const res = await fetch(`/api/address/${id}`);
        const endereco = await res.json();
        return endereco;

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}
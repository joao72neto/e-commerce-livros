//Comparando senha has com padrão
export async function compararSenhaService(clt_id, senha) {
    try{

        const senhaJson = {clt_senha: senha};

        const res = await fetch(`/password/comparar/${clt_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(senhaJson)
        });

        if(!res.ok){
            const erros = await res.json();
            return {status: res.status, erros: erros};
        }

        return {status: res.status};

    }catch(err){
        console.error(`Erro no compararSenhaService - servicePassword: ${err}`);
        throw err;
    }
}

//DELETE

//Deletando um cliente por ID do banco de dados
export async function deletarClienteIdService(clt_id) {
    try{
        const res = await fetch(`/clientes/delete/${clt_id}`, {
           method: 'DELETE'
        });

        return res.status;

    }catch(err){
        console.error(`Erro no deletarClienteIdService - serviceClientes: ${err}`);
        throw err;
    }
}

//PATCH

//Logando um cliente 
export async function logarClienteIdService(id) {
    try{
        let res = await fetch(`/logar/${id}`, {
            method: 'PATCH'
        });
        
        return res.status;

    }catch(err){
        console.error(`Erro no logarClienteIdService - serviceClientes: ${err}`);
        return 500;
    }
}

//Deslogando um cliente
export async function deslogarClienteService() {
    try{
        let res = await fetch(`/deslogar`, {
            method: 'PATCH'
        });
        
        return res.status;

    }catch(err){
        console.error(`Erro no logarClienteIdService - serviceClientes: ${err}`);
        return 500;
    }
}

//Alterando a senha do cliente
export async function alterarSenhaClienteService(senha, id) {
    try{
        let res = await fetch(`/clientes/password/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(senha)
        });
        
        return res.status;

    }catch(err){
        console.error(`Erro no alterarSenhaClienteService - serviceClientes: ${err}`);
        return 500;
    }
}

//Inativando um cliente específico
export async function inativarClienteService(id) {
    try{
        let res = await fetch(`/clientes/inativar/${id}`, {method: 'PATCH'});
        return res.status;

    }catch(err){
        console.error(`Erro no inativarClienteService - serviceClientes: ${err}`);
        return 500;
    }
    
}

//Ativando um cliente específico
export async function ativarClienteService(id) {
    try{
        let res = await fetch(`/clientes/ativar/${id}`, {method: 'PATCH'});
        return res.status;

    }catch(err){
        console.error(`Erro no ativarClienteService - serviceClientes: ${err}`);
        return 500;
    }
    
}

//GET

//Buscando o cliente logado
export async function buscarClienteLogadoService() {
    try{

        const res = await fetch(`/api/clientes/logado`);
        const cliente = await res.json();
        return cliente;

    }catch(err){
        console.error(`Erro no buscarClienteLogadoService - serviceClientes: ${err}`);
        throw err;
    }
}


//Pegando clientes por id
export async function buscarClienteIdService(id) {
    try{

        const res = await fetch(`/api/clientes/id/${id}`);
        const cliente = await res.json();
        return cliente[0];

    }catch(err){
        console.error(`Erro no buscarClienteIdService - serviceClientes: ${err}`);
        throw err;
    }
}

//Pegando clientes ativos
export async function buscarClientesAtivosService() {
    try{

        const res = await fetch(`/api/clientes/ativos`);
        const clientes = await res.json();
        return clientes;

    }catch(err){
        console.error(`Erro no buscarClientesAtivosService - serviceClientes: ${err}`);
        throw err;
    }
}

//Pegando clientes inativos
export async function buscarClientesInativosService() {
    try{

        const res = await fetch(`/api/clientes/inativos`);
        const clientes = await res.json();
        return clientes;

    }catch(err){
        console.error(`Erro no buscarClientesInativosService - serviceClientes: ${err}`);
        throw err;
    }
}



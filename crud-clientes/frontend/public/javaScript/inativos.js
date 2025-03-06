//Personalizando a msg de cliente inativos
try{
    let res = await fetch('/api/clientes/inativos', {method: 'GET'});
    let clientesInativos = await res.json();

    if (clientesInativos.length === 0) {
        let titulo = document.querySelector('.title');
        titulo.textContent = 'Nunhum Cliente Inativo';
        titulo.style.cssText = `
        
            box-shadow: 0px 0px 20px #0000005b;
            padding: 40px;
            border-radius: 20px;
        
        `
    }

}catch(err){
    console.error(err);
}

//Reativando o cliente
document.querySelectorAll('.btn-inat').forEach(button => {
    button.addEventListener('click', async function(){

        const clienteWrapper = this.closest('.cliente-wrapper');
        const id = clienteWrapper.querySelector('.cliente-inat-id').textContent;

        try{
            let res = await fetch(`/clientes/ativar/${id}`, {method: 'PATCH'});
            
            if(res.status === 204){
                location.reload();
            }

        }catch(err){
            console.error(err);
        }
    });
});
//Reativando o cliente
document.querySelectorAll('.btn-inat').forEach(button => {
    button.addEventListener('click', async function(){

        const clienteWrapper = this.closest('.cliente-wrapper');
        const id = clienteWrapper.querySelector('.cliente-inat-id').textContent;

        //Ativando o cliente
        try{
            await fetch(`/clientes/ativar/${id}`, {method: 'PATCH'});
        }catch(err){
            console.error(err);
        }

        location.reload();


    });
});
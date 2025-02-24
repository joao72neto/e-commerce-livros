//MOSTRANDO OS CLIENTES QUE ESTÃO INATIVADOS
let container = document.querySelector('#clientes-inativos');
container.innerHTML = '';

let clientesInativos = JSON.parse(sessionStorage.getItem('clientesInativos')) || [];

if(clientesInativos.length === 0){
    container.innerHTML = '<p style="text-align: center;">Nenhum cliente foi inativado</p>';
}else{
    clientesInativos.forEach(cliente => {
        let div = document.createElement('div');
        div.classList.add('cliente-wrapper');
        div.innerHTML = `
            <div class="cliente">
                <p>${cliente.nome}</p>
                <p>${cliente.email}</p>
            </div>
            <button class="reativar" data-email="${cliente.email}">Reativar</button>
        
        `;

        container.appendChild(div);
    });
}


//REATIVANDO CLIENTES INATIVADOS
document.querySelectorAll('.reativar').forEach(button => {
    button.addEventListener('click', function(){

        let index = this.getAttribute('data-email');
        
        if(index != null){

            //Pegando o cliente a ser inativado
            let clientesAtivos = JSON.parse(sessionStorage.getItem('clientesAtivos')) || [];

            clientesAtivos.push(clientesInativos.splice(index, 1)[0]);

            //Atualizando o sessionStorage
            sessionStorage.setItem('clientesInativos', JSON.stringify(clientesInativos));
            sessionStorage.setItem('clientesAtivos',JSON.stringify(clientesAtivos));

            //Removendo o cliente
            this.closest('.cliente-wrapper').remove();
        }
    });
});
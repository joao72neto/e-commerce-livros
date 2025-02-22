//Mostrando clientes desativados
let container = document.querySelector('#clientes-inativos');
container.innerHTML = '';

let clientesInativos = JSON.parse(sessionStorage.getItem('clientesInativos')) || [];

if(clientesInativos.length === 0){
    container.innerHTML = '<p style="text-align: center;">Nenhum cliente foi inativado</p>';
}else{
    clientesInativos.forEach((cliente, index) => {
        let div = document.createElement('div');
        div.classList.add('cliente-wrapper');
        div.innerHTML = `
            <div class="cliente">
                <p>${cliente.nome}</p>
                <p>${cliente.email}</p>
            </div>
            <button class="reativar" data-index="${index}">Reativar</button>
        
        `;

        container.appendChild(div);
    });
}

//Reativando os clientes inativos
document.querySelectorAll('.reativar').forEach(button => {
    button.addEventListener('click', function(){
        let index = this.getAttribute('data-index');

        if(index != null){

            //Pegando o cliente a ser inativado
            let clientesInativos = JSON.parse(sessionStorage.getItem('clientesInativos')) || [];

            clientesInativos.splice(index, 1)[0];

            //Atualizando o sessionStorage
            sessionStorage.setItem('clientesInativos', JSON.stringify(clientesInativos));

            //Removendo o cliente
            this.closest('.cliente-wrapper').remove();
        }
    });
});
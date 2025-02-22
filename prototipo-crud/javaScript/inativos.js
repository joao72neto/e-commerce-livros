//Mostrando clientes desativados
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
            <button class="reativar">Reativar</button>
        
        `;

        container.appendChild(div);
    });
}
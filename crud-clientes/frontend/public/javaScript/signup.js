//ADICIONANDO O FUNCIONAMENTO DA CHECKBOX
document.querySelector('input[type="checkbox"]').addEventListener('click', function(){
    
    let container = document.querySelector('.container-forms');
    let div = document.createElement('div');
    let endereco_entrega = document.querySelector('.endereco_entrega');
    let cartoes = document.querySelector('.container-forms .cartoes');
    
    if(!this.checked){
        if(!endereco_entrega){

            cartoes.style.cssText = `
                grid-row: 4;
            `;

            div.classList.add('endereco_entrega');
            div.innerHTML = `
                <h3>Endereço de Entrega</h3>
                <label for="tipo_residencia">Tipo de Residência</label>
                <input type="text" id="tipo_residencia" name="tipo_residencia" placeholder="Apartamento, Casa, etc." required>

                <label for="tipo_logradouro">Tipo de Logradouro</label>
                <input type="text" id="tipo_logradouro" name="tipo_logradouro" placeholder="Rua, Avenida, Travessa, etc." required>

                <label for="logradouro">Logradouro</label>
                <input type="text" id="logradouro" name="logradouro" placeholder="Nome da rua ou avenida" required>

                <label for="numero">Número</label>
                <input type="text" id="numero" name="numero" placeholder="Número da residência" required>

                <label for="bairro">Bairro</label>
                <input type="text" id="bairro" name="bairro" placeholder="Nome do bairro" required>

                <label for="cep">CEP</label>
                <input type="text" id="cep" name="cep" placeholder="XXXXX-XXX" required>

                <label for="cidade">Cidade</label>
                <input type="text" id="cidade" name="cidade" placeholder="Nome da cidade" required>

                <label for="estado">Estado</label>
                <input type="text" id="estado" name="estado" placeholder="Estado (UF)" required>

                <label for="pais">País</label>
                <input type="text" id="pais" name="pais" placeholder="Nome do país" required>

                <label for="observacoes">Observações</label>
                <input type="text" id="observacoes" name="observacoes" placeholder="Informações adicionais (opcional)">

            `;

            container.appendChild(div);
        }

    }else{
        if (endereco_entrega){
            endereco_entrega.remove();

            cartoes.style.cssText = `
                grid-row: 1;
            `;
        }
    }
});



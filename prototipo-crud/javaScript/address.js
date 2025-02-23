//checkbox
document.querySelector('input[type="checkbox"]').addEventListener('click', function(){
    
    let container = document.querySelector('.container-forms-address');
    let div = document.createElement('div');
    let endereco_entrega = document.querySelector('.endereco_entrega');

    let checkbox = document.querySelector('.container-forms-address .checkbox');
    let endereco_cobranca = document.querySelector('.container-forms-address .endereco_cobranca');
    
    if(!this.checked){
        if(!endereco_entrega){


            endereco_cobranca.style.cssText = `
                grid-row: 2;
                grid-column: span 2;
                justify-self: none;
                width: 100%;
            `;

            checkbox.style.cssText = `
                grid-column: span 2;
                text-align: center;
            `;

            div.classList.add('endereco_entrega');
            div.innerHTML = `
                <h3>Endereço de Entrega</h3>
                <label for="tipo_residencia">Tipo de Residência</label>
                <input type="text" id="tipo_residencia" name="tipo_residencia" required>

                <label for="tipo_logradouro">Tipo de Logradouro</label>
                <input type="text" id="tipo_logradouro" name="tipo_logradouro" required>

                <label for="logradouro">Logradouro</label>
                <input type="text" id="logradouro" name="logradouro" required>

                <label for="numero">Número</label>
                <input type="text" id="numero" name="numero" required>

                <label for="bairro">Bairro</label>
                <input type="text" id="bairro" name="bairro" required>

                <label for="cep">CEP</label>
                <input type="text" id="cep" name="cep" required>

                <label for="cidade">Cidade</label>
                <input type="text" id="cidade" name="cidade" required>

                <label for="estado">Estado</label>
                <input type="text" id="estado" name="estado" required>

                <label for="pais">País</label>
                <input type="text" id="pais" name="pais" required>

                <label for="observacoes">Observações</label>
                <input type="text" id="observacoes" name="observacoes">
            `;

            container.appendChild(div);
        }

    }else{
        if (endereco_entrega){

            endereco_cobranca.style.cssText = `
                grid-row: 2;
                grid-column: span 4;
                justify-self: center;
                width: 65%;
            `;

            checkbox.style.cssText = `
                grid-column: span 4;
                text-align: center;
            `;

            endereco_entrega.remove();
        }
    }
});

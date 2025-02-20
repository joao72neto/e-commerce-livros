
/*Filtering Clients*/ 
document.querySelector('#flt').addEventListener('click', () => {
    
    let filtro_clientes = document.querySelector('.filtro_clientes');

    if(filtro_clientes.innerHTML.trim() === ''){

        filtro_clientes.style.padding = '30px';
        document.querySelector('.filtro_clientes').innerHTML = `
        
            <select name="nomes" id="nomes">
                    <option value="nome">Nome</option>
                    <option value="joaldo">Joaldo</option>
                    <option value="jose">José</option>
                    <option value="joel">Joel</option>
                </select>

                <select name="paises" id="paises">
                    <option value="pais">País</option>
                    <option value="brasil">Brasil</option>
                    <option value="espanha">Espanha</option>
                    <option value="eua">EUA</option>
                </select>

                <select name="estados" id="estados">
                    <option value="estado">Estado</option>
                    <option value="sp">São Paulo</option>
                    <option value="mg">Minas Gerais</option>
                    <option value="mt">Mato Grosso</option>
                </select>

                <select name="cidades" id="cidades">
                    <option value="cidade">Cidade</option>
                    <option value="guararema">Guararema</option>
                    <option value="poa">Poá</option>
                    <option value="mogi">Mogi</option>
                </select>
        
        `;

        
    }else{
        filtro_clientes.innerHTML = '';
        filtro_clientes.style.padding = '10px';
    }
});

/*Searching for Clients*/
document.querySelector('#bsc').addEventListener('click',() => {
    let busca_clientes = document.querySelector('.busca_clientes');

    if(busca_clientes.innerHTML.trim() === ''){

        busca_clientes.style.padding = '15px 0 30px 0';
        document.querySelector('.busca_clientes').innerHTML = `
        
            <input type="text" placeholder="Busque clientes...">
        
        `;

        
    }else{
        busca_clientes.innerHTML = '';
        busca_clientes.style.padding = '0';
    }
});
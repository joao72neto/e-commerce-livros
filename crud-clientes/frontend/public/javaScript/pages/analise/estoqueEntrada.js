import { adicionarEstoqueService } from "/javaScript/service/analise/serviceEstoque.js"

//Adicionando nova entrada no estoque
document.querySelector('button[type="submit"]').addEventListener('click', async function(event){
    
    event.preventDefault();

    //Obtendo os dados
    const lvr_id = Number(document.querySelector('#livro').value);
    const for_id = Number(document.querySelector('#fornecedor').value);
    const est_valorCompra = Number(document.querySelector('#valor_custo').value);
    const est_qtd = Number(document.querySelector('#qtd').value);
    const gpp_id = Number(document.querySelector('#grupo_precificacao').value);


    //Preparando os dados
    const entrada = {
        est_for_id: for_id,
        est_lvr_id: lvr_id,
        est_gpp_id: gpp_id,
        est_qtd: est_qtd,
        est_valorCompra: est_valorCompra
    }

    //Cadastrando os dados no banco de dados
    const res = await adicionarEstoqueService(entrada);

    console.log(res);

    if(res.status === 201){
        alert('Entrada adicionada com sucesso!');
        window.location.href = '/estoque';
        return;
    }

    alert('Não foi possível adicionar nova entrada');


});
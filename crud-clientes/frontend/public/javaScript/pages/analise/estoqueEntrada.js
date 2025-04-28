import { adicionarEstoqueService } from "/javaScript/service/analise/serviceEstoque.js"
import { deletarDevolvidoTrocadoService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";



//Adicionando nova entrada no estoque ou retornando um item para o estoque
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

        //Obtendo parâmetros (se houver)
        const urlParams = new URLSearchParams(window.location.search);
        const retorno = urlParams.get('retorno');
        const clt_id = urlParams.get('clt_id');
        const lvr_id = urlParams.get('lvr_id');

        console.log(retorno);

        if(retorno){

            //Removendo o livro da tabela de troca
            const dados = {
                clt_id: clt_id,
                lvr_id: lvr_id
            }

            const res = await deletarDevolvidoTrocadoService(dados);

            if(!res === 204){
                alert('Não foi possível excluir o produto da tabela de troca');
                return;
            }

            const vnd_id = document.querySelector('.vnd-id').textContent;

            const updateStatus = {
                vnd_id: vnd_id,
                vnd_status: 'Devolução Concluída'
            }

            const resStatus = await atualizarStatusPedidoIdService(updateStatus);

            if(!resStatus === 200){
                alert('Não foi possível atualizar o status');
            }

            window.location.href = retorno;
            return;
        }

        window.location.href = '/estoque';
        return;
    }

    alert('Não foi possível adicionar nova entrada');


});
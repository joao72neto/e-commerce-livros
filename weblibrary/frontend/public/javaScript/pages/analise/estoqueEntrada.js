import { adicionarEstoqueService } from "/javaScript/service/analise/serviceEstoque.js"
import { deletarDevolvidoTrocadoService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { adicionarCupomService } from "/javaScript/service/compras/servicePagamento.js";


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
    const urlParams = new URLSearchParams(window.location.search);
    const retorno = urlParams.get('retorno');

    const entrada = {
        est_for_id: for_id,
        est_lvr_id: lvr_id,
        est_gpp_id: gpp_id,
        est_qtd: est_qtd,
        est_valorCompra: est_valorCompra,
        est_origem: retorno ? 'DEVOLUÇÃO' : 'COMPRA'
    }

    console.log(entrada);

    //Cadastrando os dados no banco de dados
    const res = await adicionarEstoqueService(entrada);

    console.log(res);

    if(res.status === 201){
        alert('Entrada adicionada com sucesso!');

        //Obtendo parâmetros (se houver)
        const urlParams = new URLSearchParams(window.location.search);
        const retorno = urlParams.get('retorno');
        const clt_id = urlParams.get('clt_id');
        const vnd_id = urlParams.get('vnd_id');
        const trc_tipo = urlParams.get('trc_tipo');
        const preco = document.querySelector('#valor_custo').value;
        const qtd = document.querySelector('#qtd').value;


        if(retorno){

            const res = await deletarDevolvidoTrocadoService(vnd_id);

            if(!res === 204){
                alert('Não foi possível excluir o produto da tabela de troca');
                return;
            }

            //Atualizando o status do pedido
            const updateStatus = {
                vnd_id: vnd_id,
                vnd_status: 'Devolução Concluída'
            }

            const resStatus = await atualizarStatusPedidoIdService(updateStatus);

            if(!resStatus === 200){
                alert('Não foi possível atualizar o status');
                return;
            }


            //Preparando os dados do cupom, caso a solicitação tenha sido troca
            if(trc_tipo === 'troca'){
                let valor = (preco * qtd) * 0.25;
                valor = valor.toFixed(2);
                const dadosCupom = {
                    cup_clt_id: clt_id,
                    cup_codigo: 'TROCA25',
                    cup_tipo: 'troca',
                    cup_valor: valor
                }

                //Adicionando o cupom para o cliente
                const resCupom = await adicionarCupomService(dadosCupom);

                if (!resCupom === 201){
                    alert('Não foi possível adicionar um cupom para o usuário');
                    return;
                }

                alert(`Cupom de R$ ${String(valor).replace('.', ',')} adicionado ao usuário`);
            }

            window.location.href = retorno;
            return;
        }

        window.location.href = '/estoque';
        return;
    }

    alert('Não foi possível adicionar nova entrada');


});
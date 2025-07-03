import { adicionarEstoqueService } from "/javaScript/service/analise/serviceEstoque.js"
import { deletarDevolvidoTrocadoService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { adicionarCupomService } from "/javaScript/service/compras/servicePagamento.js";

document.addEventListener('DOMContentLoaded', function(){
    addReturnItemEstoque();
    passarLivroId();
    desabilitarSelectInputs();
    montarSelectLivros();
});

//Passando o ID do livro para o back
function passarLivroId(){
    document.querySelector('#livro').addEventListener('change', function(){
        let url = window.location.pathname + `?lvr_id=${this.value}`;
        window.location.href = url;
    })
}

function validarDados(){

    //Obtendo os objetos
    const selectValue = document.querySelector('#livro').value;
    const qtd = document.querySelector('#qtd').value;
    const valorVenda = document.querySelector('#valor_custo').value;

    //Validando
    if(!selectValue || !qtd || !valorVenda || qtd < 1){
        return false;
    }

    return true;
}

function montarSelectLivros(){
    const livros = document.querySelector('#livro');
    new Choices(livros, {
        searchEnabled: true,
        removeItemButton: true,   
        placeholderValue: 'Pesquisar...',           
        maxItemCount: 10 
    });
}

//Desabilitando selects e inputs ao retornar um item
function desabilitarSelectInputs(){

    //Verificando em qual página estou
    let params = new URLSearchParams(window.location.search);
    const retorno = params.get('retorno');

    if(retorno){
        //Obtendo os elementos
        const selectLivro = document.querySelector('#livro');
        const qtd = document.querySelector('#qtd');
        const valor_custo = document.querySelector('#valor_custo'); 

        //Desabilitando os elementos
        selectLivro.disabled = true;
        qtd.disabled = true;
        valor_custo.disabled = true;
    }
}

//Adicionando nova entrada no estoque ou retornando um item para o estoque
function addReturnItemEstoque(){
    
    document.querySelector('button[type="submit"]').addEventListener('click', async function(event){
        
        event.preventDefault();

        //Verificando se todos os campos foram preenchidos
        if(!validarDados()){
            alert('Preencha todos os campos');
            return;
        }

        //Obtendo os dados
        const lvr_id = Number(document.querySelector('#livro').value);
        const for_id = Number(document.querySelector('#fornecedor').value);
        const est_valorCompra = Number(document.querySelector('#valor_custo').value);
        const est_qtd = Number(document.querySelector('#qtd').value);
        const gpp_id = Number(document.querySelector('#grupo_precificacao').value);

        //Preparando os dados
        const urlParams = new URLSearchParams(window.location.search);
        const trc_tipo = urlParams.get('trc_tipo');

        const entrada = {
            est_for_id: for_id,
            est_lvr_id: lvr_id,
            est_gpp_id: gpp_id,
            est_qtd: est_qtd,
            est_valorCompra: est_valorCompra,
            est_origem: trc_tipo ? trc_tipo.toUpperCase() : 'COMPRA'
        }

        //Cadastrando os dados no banco de dados
        const res = await adicionarEstoqueService(entrada);

        if(res.status === 201){
            alert('Entrada adicionada com sucesso!');

            //Obtendo parâmetros (se houver)
            const urlParams = new URLSearchParams(window.location.search);
            const retorno = urlParams.get('retorno');
            const clt_id = urlParams.get('clt_id');
            const vnd_id = urlParams.get('vnd_id');
            const ped_number = urlParams.get('ped_number');
            const preco = document.querySelector('#valor_custo').value;
            const qtd = document.querySelector('#qtd').value;

            if(retorno){

                const res = await deletarDevolvidoTrocadoService(vnd_id);

                if(!res === 204){
                    alert('Não foi possível excluir o produto da tabela de troca');
                    return;
                }

                //Atualizando o status do pedido
                let updateStatus = {
                    vnd_id: vnd_id,
                    ped_number: ped_number,
                    vnd_status: 'Devolução Concluída',
                    system: true
                }

                if(trc_tipo === 'troca'){
                    updateStatus.vnd_status = 'Troca Concluída';
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
}


import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { devolverTrocarProdutoService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";

document.addEventListener('DOMContentLoaded', function(){
    this.querySelectorAll('#submenu-dev').forEach(menu => {
        menu.addEventListener('click', function(){
            
            setTimeout(() => {
                //Retirando o menu ao clicar de novo
                let submenuAtual = this.querySelector('.submenu');

                if(submenuAtual){
                    submenuAtual.remove();
                    return;
                }

                //Criando submenu-dev
                let submenuDev = document.createElement('div');
                submenuDev.classList.add('submenu');


                submenuDev.innerHTML = `
                    <a class="opcoes dev-tudo" href="#">Devolver Tudo</a>
                    <a class ="opcoes dev-alguns" href="#">Delvolver Alguns</a>
                `;

                // Adicionando submenu ao lado do botão clicado
                this.appendChild(submenuDev);
            }, 0);
        });
    });

    //Removendo notificação ao clicar fora da tela
    this.addEventListener('click', function(){
        const submenu = document.querySelector('.submenu');

        if(submenu){
            submenu.remove();
        }
    });

    //Adicionando evento para quando clicar algum link
    this.querySelector('.main-container').addEventListener('click', async function(event){

        const btn = event.target.closest('.opcoes');

        if(!btn) return;

        event.preventDefault();

        //Atualizando o status dos pedidos
        const wrapper = btn.closest('.wrapper');
        const vnd_id = wrapper.querySelector('.vnd-id').textContent;
        const lvr_id = wrapper.querySelector('.book-id').textContent;
        let qtd = Number(wrapper.querySelector('#qtd').textContent)
        let tipo = 'devolucao';

        //Preparando os dados para atualizar o status
        let status = {
            vnd_id: vnd_id,
            vnd_status: 'Devolução Solicitada'
        }

        //Obtendo o cliente logado
        const cliente = await buscarClienteLogadoService();

        //Preparando os dados para colocar na tabela de troca
        const troca = {
            trc_clt_id: cliente[0].clt_id,
            trc_vnd_id: vnd_id,
            trc_lvr_id: Number(lvr_id),
            trc_qtd: qtd,
            trc_preco: Number(wrapper.querySelector('#preco').textContent),
            trc_tipo: tipo
        }

        //Verificando qual botão foi selecionado
        if (btn.classList.contains('dev-alguns')){

            //Obtendo os elementos
            const inputQtdTroca = wrapper.querySelector('#qtd-troca');
            const btnDev = wrapper.querySelector('.devolucao');

            //Removendo o menu ao clicar fora
            const eventoClique = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });

            setTimeout(() => {
                wrapper.dispatchEvent(eventoClique);
            }, 0);
            
            //Mudando o valor do botão ao clicar
            btnDev.textContent = 'Confimar';
            
            //Mostrando o input
            inputQtdTroca.classList.remove('invisible'); 


            //Verificando se a qtd foi confirmada ou não
            btnDev.addEventListener('click', async function(event){
                event.stopPropagation();

                //Obtendo o valor do input
                let qtdUpdate = inputQtdTroca.value;

                //Verificando o valor
                if(qtdUpdate < 1 || qtdUpdate > qtd) {
                    alert('Qtd definida não é válida');
                    return;
                }           
                
                 //Atualizando a nova qtd
                troca.trc_qtd = Number(qtdUpdate);

                //Devolvendo o livro
                await devolverLivro(troca, status, tipo);
            });

        }else{
            await devolverLivro(troca, status, tipo);
        }

    });

    this.querySelectorAll('.acoes').forEach(function(acoes){
        const wrapper = acoes.closest('.wrapper');
        const statusText = wrapper.querySelector('.status strong').textContent;

        if(statusText !== 'Entregue'){
            acoes.remove();
            wrapper.style.cssText = `
                grid-template-columns: 1fr 1fr 40%;
            
            `
        }
    });
});


async function devolverLivro(troca, status, tipo) {

    //Atualizando o status
    const res = await atualizarStatusPedidoIdService(status);

    if(res === 200){

        //Adicionando o livro na tabela de trocas
        const res = await devolverTrocarProdutoService(troca);
        
        if(res === 201){
            alert(tipo + ' solicitado(a) com sucesso!');
            window.location.reload();
            return;
        }

        alert('Não foi possível solicitar o(a) ' + tipo);
        return;
    }

    alert('Não foi possível atualizar o status do pedido');    
}

import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { devolverTrocarProdutoService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";

document.addEventListener('DOMContentLoaded', function(){

    //Submenu para o botão de devolução
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

    //Submenu para o botão de troca
    this.querySelectorAll('#submenu-tro').forEach(menu => {
        menu.addEventListener('click', function(){
            
            setTimeout(() => {
                //Retirando o menu ao clicar de novo
                let submenuAtual = this.querySelector('.submenu');

                if(submenuAtual){
                    submenuAtual.remove();
                    return;
                }

                //Criando submenu-dev
                let submenuTro = document.createElement('div');
                submenuTro.classList.add('submenu');

                submenuTro.style.cssText = `
                    top: 100px;

                `;

                submenuTro.innerHTML = `
                    <a class="opcoes tro-tudo" href="#">Troca Tudo</a>
                    <a class ="opcoes tro-alguns" href="#">Trocar Alguns</a>
                `;

                // Adicionando submenu ao lado do botão clicado
                this.appendChild(submenuTro);
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
        let qtd = Number(wrapper.querySelector('#qtd').textContent);
        let tipo = 'devolucao';

        //Preparando os dados para atualizar o status
        let status = {
            vnd_id: vnd_id,
            vnd_status: 'Devolução Solicitada'
        }

        //Mudando o status caso o usuário escolha troca
        if(btn.classList.contains('tro-tudo')){
            status.vnd_status = 'Troca Solicitada';
            tipo = 'troca';
        }
        
        //Obtendo o cliente logado
        const cliente = await buscarClienteLogadoService();

        //Preparando os dados para colocar na tabela de troca
        let trocaDev = {
            trc_clt_id: cliente[0].clt_id,
            trc_vnd_id: vnd_id,
            trc_lvr_id: Number(lvr_id),
            trc_qtd: qtd,
            trc_preco: Number(wrapper.querySelector('#preco').textContent),
            trc_tipo: tipo
        }

        //Obtendo os elementos
        const inputQtdTroca = wrapper.querySelector('#qtd-troca');
        const btnDev = wrapper.querySelector('.devolucao');
        const btnTroca = wrapper.querySelector('.troca');

        //Verificando qual botão foi selecionado
        if (btn.classList.contains('dev-alguns') || 
            btn.classList.contains('tro-alguns')){
            
            //Editando os dados para troca
            if(btn.classList.contains('tro-alguns')){
                status.vnd_status = 'Troca Solicitada';
                trocaDev.trc_tipo = 'troca';
                tipo = 'troca';
            }

            //Removendo o menu ao clicar fora
            const eventoClique = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });

            setTimeout(() => {
                wrapper.dispatchEvent(eventoClique);
            }, 0);
            
            //Organizando os botões caso seja troca ou devolução
            if(btn.classList.contains('dev-alguns')){

                btnTroca.remove();
                btnDev.textContent = 'Confimar';
                
            }else{

                btnDev.remove();
                btnTroca.textContent = 'Confimar';
                btnTroca.style.cssText = `
                    grid-row: 0;
                `;
            }

            //Mostrando o input
            inputQtdTroca.classList.remove('invisible'); 

            //Definindo o botão ser clicado
            let botao = btnDev;
            if(btn.classList.contains('tro-alguns')){
                botao = btnTroca;
                
            }

            //Verificando se a qtd foi confirmada ou não
            botao.addEventListener('click', async function(event){
                event.stopPropagation();

                //Obtendo o valor do input
                let qtdUpdate = inputQtdTroca.value;

                //Verificando o valor
                if(qtdUpdate < 1 || qtdUpdate > qtd) {
                    alert('Qtd definida não é válida');
                    return;
                }           
                
                //Atualizando a nova qtd
                trocaDev.trc_qtd = Number(qtdUpdate);

                //Devolvendo o livro
                await devolverLivro(trocaDev, status, tipo);
            });

        }else{
            await devolverLivro(trocaDev, status, tipo);
        }

    });

    //Mostrnado os botões quando o status é "Entregue"
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

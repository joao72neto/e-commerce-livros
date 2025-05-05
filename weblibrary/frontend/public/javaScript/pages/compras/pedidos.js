import { atualizarStatusPedidoIdService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";
import { buscarClienteLogadoService } from "/javaScript/service/clientes/serviceClientes.js";
import { devolverTrocarProdutoService } from "/javaScript/service/analise/serviceGerenciarPedidos.js";

document.addEventListener('DOMContentLoaded', function(){


    this.querySelectorAll('#submenu-dev').forEach(menu => {
        menu.addEventListener('click', function(event){

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

    //Adicionando evento para quando clicar algum link
    this.querySelector('.main-container').addEventListener('click', async function(event){

        const btn = event.target.closest('.opcoes');

        if(!btn) return;

        //Atualizando o status dos pedidos
        const wrapper = btn.closest('.wrapper');
        const vnd_id = wrapper.querySelector('.vnd-id').textContent;
        const lvr_id = wrapper.querySelector('.book-id').textContent;
        let qtd = Number(wrapper.querySelector('#qtd').textContent)
        let tipo = 'devolucao';

        //Preparando os dados
        let dados = {
            vnd_id: vnd_id,
            vnd_status: 'Devolução Solicitada'
        }

        if (btn.classList.contains('dev-alguns')){
            let qtdUpdate = 0;

            do{
                qtdUpdate = prompt('Quantos livros deseja devolver?');
                if(qtdUpdate > qtd){
                    alert('Não pode devolver mais do que ' + qtd + ' livro(s)');
                    continue;
                }

            }while(qtdUpdate > qtd);
            
            if(!qtdUpdate || qtdUpdate === 0){
                return;
            }

            qtd = qtdUpdate;
        }

        //Atualizando o status
        const res = await atualizarStatusPedidoIdService(dados);

        if(res === 200){

            //Adicionando o livro na tabela de trocas
            const cliente = await buscarClienteLogadoService();
            

            //Preparando os dados
            const troca = {
                trc_clt_id: cliente[0].clt_id,
                trc_vnd_id: vnd_id,
                trc_lvr_id: Number(lvr_id),
                trc_qtd: qtd,
                trc_preco: Number(wrapper.querySelector('#preco').textContent),
                trc_tipo: tipo
            }

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

    });

    //Removendo notificação ao clicar fora da tela
    this.addEventListener('click', function(){
        const submenu = document.querySelector('.submenu');

        if(submenu){
            submenu.remove();
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



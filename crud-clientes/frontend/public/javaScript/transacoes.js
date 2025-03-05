import { pegarTodosClientes } from "/javaScript/service/serviceClientes.js";
import { pegarTodasTransacoes } from "/javaScript/service/serviceTransacoes.js";

async function mostrarTransacoes() {
    try{
        let cliente = await pegarTodosClientes();
        let transacoes = await pegarTodasTransacoes();
        
        //Filtrando os dados
        const id = Number(sessionStorage.getItem('clt_id'));
        cliente = cliente.find(clt => clt.clt_id === id);
        transacoes = transacoes.filter(trs => Number(trs.trs_clt_id) === id);

        document.querySelector('#nome-cliente').textContent = cliente.clt_nome;
        document.querySelector('#email-cliente').textContent = cliente.clt_email;

        //const tabela = document.querySelector("#transactionTable");
        let container = document.querySelector('#lista-transacoes');

        //Criando um elemento para colocar os Dados
        let tbody = document.createElement('tbody');


        transacoes.forEach(transacao => {
            const linha = `<tr>
                <td>${transacao.trs_id}</td>
                <td>${transacao.trs_dataHora}</td>
                <td>${transacao.trs_tipo}</td>
                <td>${transacao.trs_acao}</td>
                <td>${transacao.trs_status}</td>
            </tr>`;
        
            tbody.innerHTML += linha;
        });
        
        container.appendChild(tbody);

    }catch(err){
        console.error(`Erro: ${err}`);
        throw err;
    }
}

mostrarTransacoes();
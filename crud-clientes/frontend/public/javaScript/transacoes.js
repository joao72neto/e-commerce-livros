// import { pegarClientesId } from "/javaScript/service/serviceClientes.js";
// import { pegarTransacoesClienteId } from "/javaScript/service/serviceTransacoes.js";


// async function mostrarTransacoes() {
//     try{
        
//         //Pegando os dados por id
//         const id = Number(sessionStorage.getItem('clt_id'));
//         let transacoes = await pegarTransacoesClienteId(id);
//         let cliente = await pegarClientesId(id);

//         document.querySelector('#nome-cliente').textContent = cliente[0].clt_nome;
//         document.querySelector('#email-cliente').textContent = cliente[0].clt_email;

//         //const tabela = document.querySelector("#transactionTable");
//         let container = document.querySelector('#lista-transacoes');

//         //Criando um elemento para colocar os Dados
//         let tbody = document.createElement('tbody');


//         transacoes.forEach(transacao => {
//             const linha = `<tr>
//                 <td>${transacao.trs_id}</td>
//                 <td>${transacao.trs_dataHora}</td>
//                 <td>${transacao.trs_tipo}</td>
//                 <td>${transacao.trs_acao}</td>
//                 <td>${transacao.trs_status}</td>
//             </tr>`;
        
//             tbody.innerHTML += linha;
//         });
        
//         container.appendChild(tbody);

//     }catch(err){
//         console.error(`Erro: ${err}`);
//         throw err;
//     }
// }

// mostrarTransacoes();
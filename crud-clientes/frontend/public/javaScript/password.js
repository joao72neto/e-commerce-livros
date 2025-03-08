//Tratando da recuperação de senha
import { buscarClienteIdService } from "/javaScript/service/serviceClientes.js";
import { alterarSenhaClienteService } from "/javaScript/service/serviceClientes.js";

document.querySelector('form').addEventListener('submit', async function(event){
    event.preventDefault();

    const senhaAtual = document.querySelector('.senha-atual').value;

    //Pegando o ID do cliente
    const clt_id = window.location.pathname.split('/').splice(-1)[0];

    const cliente = await buscarClienteIdService(clt_id);

    if(cliente.clt_senha == senhaAtual){

        const senhaNova = document.querySelector('.senha-nova').value;
        const senhaRep = document.querySelector('.senha-rep').value;

        if((senhaNova === senhaRep) && (senhaNova !== '' && senhaRep !== '')){

            //Alterando a senha do banco
            const status = await alterarSenhaClienteService({
                clt_senha: senhaNova
            }, clt_id);

            if(status === 204){
                alert('Senha alterada com sucesso!');
                return;
            }

            alert('Não foi possível alterar a senha');
            return;
        }
        
        alert('Senhas são diferentes ou os campos estão vazios');
        return;
        
    }

    alert('Senha não bate com a atual');
    
});


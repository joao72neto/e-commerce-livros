//Tratando da recuperação de senha
import { buscarClienteIdService } from "/javaScript/service/clientes/serviceClientes.js";
import { alterarSenhaClienteService } from "/javaScript/service/clientes/serviceClientes.js";

document.querySelector('form').addEventListener('submit', async function(event){
    event.preventDefault();

    const senhaAtual = document.querySelector('.senha-atual').value;

    //Pegando o ID do cliente
    const clt_id = window.location.pathname.split('/').splice(-1)[0];

    const cliente = await buscarClienteIdService(clt_id);

    if(cliente.clt_senha == senhaAtual){

        //Validando a senha
        const senha = this.querySelector('.senha-nova').value;
        const senhaRep = this.querySelector('.senha-rep').value

        const requisitos = [
            { regex: /[a-z]/, mensagem: "A senha deve conter pelo menos uma letra minúscula." },
            { regex: /[A-Z]/, mensagem: "A senha deve conter pelo menos uma letra maiúscula." },
            { regex: /[\W_]/, mensagem: "A senha deve conter pelo menos um caractere especial." },
            { regex: /.{8,}/, mensagem: "A senha deve ter pelo menos 8 caracteres." }
        ];

        const erros = requisitos
            .filter(req => !req.regex.test(senha))
            .map(req => req.mensagem);

        if(senhaRep === '' && senha === ''){
            alert('Preencha os campos vazios');
            return;
        }

        if(senhaRep !== senha){
            alert('A senha não bate com a sua repetição');
            return;
        }

        if(erros.length > 0){
            alert(erros.join('\n'));
            return;
        }

        // Alterando a senha do banco
        const status = await alterarSenhaClienteService({
            clt_senha: senha
        }, clt_id);

        if(status === 204){
            alert('Senha alterada com sucesso!');
            window.location.reload();
            return;
        }

        alert('Não foi possível alterar a senha');
        return;
        
    }

    alert('Senha não bate com a atual cadastrada no banco');
    
});



//Mostrando o menu lateral
document.querySelector('#btn-sidebar').addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('header');
    const conteudo = document.querySelector('.conteudo');
    const footer = document.querySelector('footer');


    if(!sidebar.classList.contains('aberta')){
        sidebar.classList.add('aberta');
        header.style.position = 'sticky';
        header.style.top = '0';
        conteudo.style.width = '70%';
        footer.style.width = '70%';
        return;
    }

    sidebar.classList.remove('aberta');
    footer.style.width = '';
    header.style.position = '';
    conteudo.style.width = '';
});

//Redirecionando para a página de produtos
document.querySelectorAll('.imagem').forEach(image => {
    image.addEventListener('click', function(){

        //Obetendo o id do livro
        const book = this.closest('.book');
        const lvr_id = book.querySelector('.book-id').textContent;
        
        window.location.href = `/produto/${lvr_id}`;
    });
});

//Redirecionando para o cadastro de cliente
document.querySelectorAll('.compra').forEach(btn => {
    btn.addEventListener('click', function(event){

        event.preventDefault();

        alert('O cliente precisa estar cadastrado para comprar livros')

        const res = confirm('Deseja se cadastrar?'); 

        if(res){
            window.location.href = '/clientes/signup?retorno=';
            return;
        }
    });
});

document.addEventListener('DOMContentLoaded', function(){
    emptyLogMsg();
});

function emptyLogMsg(){

    //Getting the necessary elements
    const tBody = document.querySelector('.tb-body');
    const container = document.querySelector('.container');

    //Returning in case of registered logs
    if(tBody) return;

    //Creating a personalized msg in case of no logs
    const html = `
        <div class="empty">
            <p>
                Nenhum Log Registrado
            </p>
        </div>
    `;

    //Injecting HTML code into the log page
    container.innerHTML = html;
}
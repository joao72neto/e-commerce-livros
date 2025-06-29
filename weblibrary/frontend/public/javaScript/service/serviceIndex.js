//GET

//Getting unread notifications
export async function buscarUnreadNotificationsService() {
    try{

        const res = await fetch(`/api/notifications/unread`);
        const nots = await res.json();
        return nots;

    }catch(err){
        console.error(`Erro no buscarUnreadNotificationsService - serviceIndex: ${err}`);
        throw err;
    }
}
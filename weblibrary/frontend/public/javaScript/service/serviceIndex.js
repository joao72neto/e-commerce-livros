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

//PATCH

//Markng notification as read
export async function markNotificationAsReadService(not_id) {
    try{
        let res = await fetch(`/notifications/markAsRead/${not_id}`, {
            method: 'PATCH'
        });
        return res.status;

    }catch(err){
        console.error(`Erro no markNotificationAsReadService - serviceIndex: ${err}`);
        return 500;
    }
}
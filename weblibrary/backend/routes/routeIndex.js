const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/controllerIndex');

//Rotas para páginas
router.get('/', controllerIndex.getIndex);

//Update
router.patch('/notifications/markAsRead/:not_id', controllerIndex.patchMarkNotificationAsRead);

//APIs
router.get('/api/notifications/unread', controllerIndex.getApiNotifications);

//Outras
router.get('/api/version', controllerIndex.getServerVersion);

module.exports = router;
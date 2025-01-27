const express = require('express');

const { body } = require('express-validator');

const chatController = require('../controllers/chat');
const isAdminAuth = require('../middleware/is-auth-admin');

const router = express.Router();

router.get('/admin/chat', isAdminAuth, chatController.getAdminChatSidebar);
router.get('/admin/chat/:roomId', isAdminAuth, chatController.getAdminChat);
router.post(
  '/admin/add-message',
  isAdminAuth,
  chatController.postAddAdminMessage
);

router.get('/chat/:roomId', chatController.getUserChat);
router.post('/add-message', chatController.postAddUserMessage);

router.post('/make-message', chatController.postMakeAsRead);

module.exports = router;

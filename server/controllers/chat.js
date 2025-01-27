const Chat = require('../models/chat');

const io = require('../socket');

exports.getAdminChatSidebar = async (req, res, next) => {
  try {
    const chats = await Chat.find({ status: false });
    return res.status(200).json({ chats });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.getAdminChat = async (req, res, next) => {
  const roomId = req.params.roomId;
  try {
    const chat = await Chat.findById(roomId);
    return res.status(200).json({ chatMessage: chat.message });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.getUserChat = async (req, res, next) => {
  const roomId = req.params.roomId;
  try {
    const chat = await Chat.findById(roomId);
    // nếu có chứa storage nhưng đã /end
    if (chat.status === true) {
      return res.json({ status: 400, msg: 'Room ID is closed' });
    }
    const badge = chat.message.filter(
      e => e.isAdmin === true && e.status === false
    ).length;
    return res.status(200).json({ message: chat.message, badge: badge });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postMakeAsRead = async (req, res, next) => {
  const roomId = req.body.roomId;
  const isAdmin = req.body.isAdmin;
  try {
    const chat = await Chat.findById(roomId);
    //đánh dấu đã đọc message của user
    chat.message.map(e => {
      const temp = e;
      if (temp.isAdmin !== isAdmin) {
        temp.status = true;
      }
      return temp;
    });
    const result = await chat.save();
    io.getIO().emit('chat', {
      action: 'post',
    });
    return res.status(200).json({ msg: 'Post Make As Read Success' });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postAddAdminMessage = async (req, res, next) => {
  const roomId = req.body.roomId;
  const message = req.body.message;
  try {
    const chat = await Chat.findById(roomId);
    // nếu chat /end thì đóng chat
    if (message === '/end') {
      chat.status = true;
      const result = await chat.save();
      io.getIO().emit('chat', {
        action: 'post',
      });
      return res.status(200).json({ msg: 'The Chat End' });
    }
    //đánh dấu đã đọc message của user
    chat.message.map(e => {
      const temp = e;
      if (temp.isAdmin === false) {
        temp.status = true;
      }
      return temp;
    });
    chat.message = [
      ...chat.message,
      {
        content: message,
        createdAt: new Date(),
        isAdmin: true,
        status: false,
      },
    ];
    const result = await chat.save();
    io.getIO().emit('chat', {
      action: 'post',
    });
    return res.status(200).json({ msg: 'Post Message Success' });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

exports.postAddUserMessage = async (req, res, next) => {
  const roomId = req.body.roomId;
  const message = req.body.message;
  try {
    //nếu chưa có roomId
    if (!roomId) {
      //nếu chat end
      if (message === '/end') {
        return res.status(200).json({
          msg: 'Room not created, please type other value',
          endChat: true,
        });
      }
      const messageSended = {
        content: message,
        createdAt: new Date(),
        isAdmin: false,
        status: false,
      };
      const chat = new Chat({
        message: messageSended,
        createdAt: new Date(),
        isAdmin: false,
        status: false,
      });
      const result = await chat.save();
      io.getIO().emit('chat', {
        action: 'post',
      });
      return res
        .status(200)
        .json({ msg: 'Post Message Success', roomId: result._id });
    }
    // nếu đã có roomId
    const chat = await Chat.findById(roomId);
    // nếu có roomId nhưng đã /end
    if (chat.status === true) {
      return res.status(200).json({ msg: 'Not valid', endChat: true });
    }
    // nếu nhập /end thì đóng chat
    if (message === '/end') {
      chat.status = true;
      const result = await chat.save();
      io.getIO().emit('chat', {
        action: 'post',
      });
      return res.status(200).json({ msg: 'The Chat End', endChat: true });
    }
    //đánh dấu đã đọc message của admin
    chat.message.map(e => {
      const temp = e;
      if (temp.isAdmin === true) {
        temp.status = true;
      }
      return temp;
    });
    chat.message = [
      ...chat.message,
      {
        content: message,
        createdAt: new Date(),
        isAdmin: false,
        status: false,
      },
    ];
    const result = await chat.save();
    io.getIO().emit('chat', {
      action: 'post',
    });
    return res.status(200).json({ msg: 'Post Message Success' });
  } catch (err) {
    return res.status(500).json({
      msg: 'server-error',
    });
  }
};

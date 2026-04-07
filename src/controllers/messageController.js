const Message = require("../models/Message");

exports.create = async (req, res) => {
  try {
    const message = await Message.create({
      content: req.body.content,
      UserId: req.user.id,
      ConversationId: req.body.conversationId
    });

    res.json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Send message failed" });
  }
};

exports.getAll = async (req, res) => {
  const messages = await Message.findAll();
  res.json(messages);
};
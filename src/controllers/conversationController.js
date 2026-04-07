const Conversation = require("../models/Conversation");

exports.create = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      name: req.body.name,
      UserId: req.user.id
    });

    res.json(conversation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Create conversation failed" });
  }
};

exports.getAll = async (req, res) => {
  const data = await Conversation.findAll();
  res.json(data);
};
const Comment = require("../models/Comment");

exports.create = async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    UserId: req.user.id,
    PostId: req.body.postId
  });

  res.json(comment);
};

exports.getAll = async (req, res) => {
  const comments = await Comment.findAll();
  res.json(comments);
};

exports.delete = async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};
const service = require("../services/postService");

exports.create = async (req, res) => {
  try {
    const post = await service.createWithTransaction({
      content: req.body.content,
      image: req.file?.path,
      UserId: req.user.id
    });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Transaction failed → rollback"
    });
  }
};

const Post = require("../models/Post");
const Tag = require("../models/Tag");
exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Tag,
          attributes: ["id", "name"], 
          through: { attributes: [] } 
        }
      ]
    });

    res.json(posts);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch posts"
    });
  }
};

exports.update = async (req, res) => {
  try {
    await service.updatePost(req.params.id, {
      content: req.body.content
    });
    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Update failed" });
  }
};

exports.delete = async (req, res) => {
  try {
    await service.deletePost(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Delete failed" });
  }
};
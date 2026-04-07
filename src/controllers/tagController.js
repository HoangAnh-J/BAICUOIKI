const Tag = require("../models/Tag");
const Post = require("../models/Post");

exports.create = async (req, res) => {
  const tag = await Tag.create({
    name: req.body.name
  });
  res.json(tag);
};

exports.getAll = async (req, res) => {
  const data = await Tag.findAll();
  res.json(data);
};

exports.addTagToPost = async (req, res) => {
  try {
    const { postId, tagId } = req.body;

    const post = await Post.findByPk(postId);
    const tag = await Tag.findByPk(tagId);

    if (!post || !tag) {
      return res.status(404).json({
        message: "Post hoặc Tag không tồn tại"
      });
    }

    await post.addTag(tag);

    res.json({
      message: "Gắn tag thành công"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Lỗi server"
    });
  }
};
const Like = require("../models/Like");

exports.like = async (req, res) => {
  try {
    const like = await Like.create({
      UserId: req.user.id,
      PostId: req.body.postId
    });

    res.json(like);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Like failed" });
  }
};

exports.unlike = async (req, res) => {
  try {
    await Like.destroy({
      where: {
        UserId: req.user.id,
        PostId: req.body.postId
      }
    });

    res.json({ message: "Unliked" });
  } catch (err) {
    res.status(500).json({ message: "Unlike failed" });
  }
};
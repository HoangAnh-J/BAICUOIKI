const Follow = require("../models/Follow");

exports.follow = async (req, res) => {
  try {
    const follow = await Follow.create({
      FollowerId: req.user.id,
      FollowingId: req.body.userId
    });

    res.json(follow);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Follow failed" });
  }
};

exports.unfollow = async (req, res) => {
  try {
    await Follow.destroy({
      where: {
        FollowerId: req.user.id,
        FollowingId: req.body.userId
      }
    });

    res.json({ message: "Unfollowed" });
  } catch (err) {
    res.status(500).json({ message: "Unfollow failed" });
  }
};

exports.getAll = async (req, res) => {
  const data = await Follow.findAll();
  res.json(data);
};
const Notification = require("../models/Notification");

exports.create = async (req, res) => {
  try {
    const noti = await Notification.create({
      content: req.body.content,
      UserId: req.body.userId
    });

    res.json(noti);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Create notification failed" });
  }
};

exports.getAll = async (req, res) => {
  const data = await Notification.findAll();
  res.json(data);
};

exports.markAsRead = async (req, res) => {
  await Notification.update(
    { isRead: true },
    { where: { id: req.params.id } }
  );

  res.json({ message: "Marked as read" });
};
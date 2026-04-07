const service = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const user = await service.register(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await service.login(req.body);

    const { password, ...userData } = data.user.toJSON();

    res.json({
      user: userData,
      token: data.token
    });

  } catch (err) {
    res.status(400).json({ error: err });
  }
};
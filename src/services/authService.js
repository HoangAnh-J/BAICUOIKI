const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (data) => {
  const hash = await bcrypt.hash(data.password, 10);

  return await User.create({
    username: data.username,
    email: data.email,
    password: hash
  });
};

exports.login = async (data) => {
  const user = await User.findOne({ where: { email: data.email } });

  if (!user) throw "User not found";

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw "Wrong password";

  const token = jwt.sign(
    { id: user.id },
    "SECRET",
    { expiresIn: "1d" }
  );

  return { user, token };
};
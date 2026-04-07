const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Post = sequelize.define("Post", {
  content: DataTypes.STRING,
  image: DataTypes.STRING
});

module.exports = Post;
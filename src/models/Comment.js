const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Comment = sequelize.define("Comment", {
  content: DataTypes.STRING,
  
});

module.exports = Comment;
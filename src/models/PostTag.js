const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PostTag = sequelize.define("PostTag", {});

module.exports = PostTag;
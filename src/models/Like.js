const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Like = sequelize.define("Like", {});

module.exports = Like;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Conversation = sequelize.define("Conversation", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Conversation;
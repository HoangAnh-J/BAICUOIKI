const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Follow = sequelize.define("Follow", {
  FollowerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FollowingId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Follow;
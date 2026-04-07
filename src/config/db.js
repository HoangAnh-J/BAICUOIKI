const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("social_db", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
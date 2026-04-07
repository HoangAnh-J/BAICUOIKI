const sequelize = require("../config/db");
const Post = require("../models/Post");

exports.createWithTransaction = async (data) => {
  const t = await sequelize.transaction();

  try {
    const post = await Post.create(data, { transaction: t });

    //  giả lập lỗi
    if (!data.content) {
      throw new Error("Content required");
    }

    await t.commit();
    return post;

  } catch (err) {
    await t.rollback();
    throw err;
  }
};
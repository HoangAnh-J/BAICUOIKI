const Category = require("../models/Category");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    // check rỗng
    if (!name) {
      return res.status(400).json({
        message: "Name không được để trống",
      });
    }

    const category = await Category.create({ name });

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Create category error",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Category.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Get category error",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findByPk(id);

    //  không tồn tại
    if (!category) {
      return res.status(404).json({
        message: "Category không tồn tại",
      });
    }

    await category.destroy();

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete category error",
    });
  }
};
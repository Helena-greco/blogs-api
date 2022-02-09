require('dotenv').config();
const { Category } = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
};
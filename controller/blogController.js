require('dotenv').config();
const { BlogPost } = require('../models');

const createBlogs = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;

    const blogPosts = await BlogPost.create({ userId: id, title, content });

    return res.status(201).json(blogPosts);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createBlogs,
};
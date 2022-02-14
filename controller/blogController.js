require('dotenv').config();
const { BlogPost, PostsCategory } = require('../models');

const createBlogs = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, content, categoryIds } = req.body;

    const post = await BlogPost.create({ title, content, userId: id });

    const postId = post.id;

    const categories = categoryIds.map(async (categoryId) => {
        await PostsCategory.create({ postId, categoryId });
    });

    await Promise.all(categories);

    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createBlogs,
};
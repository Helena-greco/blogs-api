require('dotenv').config();
const { BlogPost, PostsCategory } = require('../models');

const createPost = async (categoryIds, postId) => {
  try {
    console.log(categoryIds);
    console.log(postId);
    const categories = categoryIds.map(async (categoryId) => {
      await PostsCategory.create({ postId, categoryId });
    });
  
    await Promise.all(categories);
    return true;
  } catch (err) {
    return false;
  }
};

const createBlogs = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;

    const post = await BlogPost.create({ title, content, userId: id });

    const postId = post.id;

    const postCat = await createPost(categoryIds, postId);
    
    if (!postCat) return res.status(400).send({ message: '"categoryIds" not found' });
    
    return res.status(201).json(post);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
};

module.exports = {
  createBlogs,
};
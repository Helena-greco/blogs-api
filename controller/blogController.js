require('dotenv').config();
const { User, BlogPost, PostsCategory, Category } = require('../models');

// Ajuda da Bel no createPost e getAllBlogs <3
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

const getAllBlogs = async (_req, res) => {
  const getAll = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user', atributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return res.status(200).json(getAll);
};

module.exports = {
  createBlogs,
  getAllBlogs,
};
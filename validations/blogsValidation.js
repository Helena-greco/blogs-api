require('dotenv').config();

const textReq = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) return res.status(400).send({ message: '"title" is required' });

  if (!content) return res.status(400).send({ message: '"content" is required' });
  next();
};

const validCategory = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;

    if (!categoryIds) return res.status(400).send({ message: '"categoryIds" is required' });

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  textReq,
  validCategory,
};
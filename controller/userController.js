require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    await User.create({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: displayName }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, getAllUsers };
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const displayNameReq = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(400).send({ 
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validateEmail = (email) => {
  const validEmail = /\S+@\S+\.\S+/;
  return validEmail.test(email);
};

const validEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email && email !== '') return res.status(400).json({ message: '"email" is required' });
  if (email.length < 1) {
    return res.status(400).send({ message: '"email" is not allowed to be empty' });
  }

  next();
};

const validPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password && password !== '') {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 1) {
    return res.status(400).send({ message: '"password" is not allowed to be empty' });
  }
  next();
};

const emailReq = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  const userEmailValidate = await User.findOne({ where: { email } });
  if (userEmailValidate) return res.status(409).send({ message: 'User already registered' });

  next();
};

const passwordReq = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const secret = process.env.JWT_SECRET;

const tokenValid = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.data } });

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    req.user = user;
  } catch (error) {
    return res.status(401).send({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  displayNameReq,
  validEmail,
  validPassword,
  emailReq,
  passwordReq,
  tokenValid,
};
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

module.exports = {
  displayNameReq,
  emailReq,
  passwordReq,
};
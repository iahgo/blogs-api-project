const { User } = require('../models');
const { createToken } = require('../auth/jwtFunctions');

const addUser = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) return { type: 'USER_ALREADY_REGISTERED', message: 'User already registered' };
  const newUser = await User.create({ displayName, email, password, image });

  const { password: _password, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);

  return { type: null, message: { token } };
};

module.exports = {
  addUser,
};
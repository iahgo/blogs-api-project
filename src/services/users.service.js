const { User } = require('../models');
const { createToken, verifyToken } = require('../auth/jwtFunctions');

const addUser = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) return { type: 'USER_ALREADY_REGISTERED', message: 'User already registered' };
  const newUser = await User.create({ displayName, email, password, image });

  const { password: _password, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);

  return { type: null, message: { token } };
};

const findAllUser = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { message: users };
};

const findById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  
  if (!user) return ({ type: 'USER_NOT_EXIST', message: 'User does not exist' });
  
  return { message: user };
};

const deleteUser = async (authorization) => {
  const dataToken = await verifyToken(authorization);
  const { email } = dataToken.data;
  const { dataValues } = await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] }, 
  });
  if (dataValues.length === 0) return { message: 'User not found' };

  await User.destroy({
    where: { id: dataValues.id },
  });
  return { code: 204 };
};

module.exports = {
  addUser,
  findAllUser,
  findById,
  deleteUser,
};
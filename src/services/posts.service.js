const { BlogPost, User, Category } = require('../models');
// const { createToken } = require('../auth/jwtFunctions');

// const addUser = async (displayName, email, password, image) => {
//   const user = await BlogPost.findOne({ where: { email } });
//   if (user) return { type: 'USER_ALREADY_REGISTERED', message: 'User already registered' };
//   const newUser = await User.create({ displayName, email, password, image });

//   const { password: _password, ...userWithoutPassword } = newUser.dataValues;
//   const token = createToken(userWithoutPassword);

//   return { type: null, message: { token } };
// };

const findAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (post.length === 0) return ({ type: 'POST_NOT_EXIST', message: 'Post does not exist' });
  
  return { message: post };
};

module.exports = {
  // addUser,
  findAllPosts,
  findById,
};
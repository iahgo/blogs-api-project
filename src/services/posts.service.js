const { BlogPost, User, Category, PostCategory } = require('../models');
const { verifyToken } = require('../auth/jwtFunctions');

const addPost = async (dataPost, dataValues) => {
  const { categoryIds } = dataPost;
  const post = await BlogPost.create(
    {
      title: dataPost.title,
      content: dataPost.content,
      userId: dataValues.id,
    },
  );
  const { id } = post.dataValues;

  await PostCategory.bulkCreate(
    categoryIds.map((idValue) => (
      {
        postId: id,
        categoryId: idValue,
      }
    )),
  );
  return post;
};

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

const checkUserPost = async (id) => {
  const data = await BlogPost.findAll({
    where: { id },
  });
  if (data.length === 0) {
    return { message: 'Post does not exist' };
  }
  return data;
};
const checkEmail = async (dataToken) => {
  const { email } = dataToken.data;
  const checkEmailUser = await User.findOne({
    where: { email },
  });
  return checkEmailUser;
};

const checkUser = async (authorization, checkPost) => {
  const { dataValues } = checkPost[0];
  const datas = await verifyToken(authorization); 

  const { email } = datas.data;
  const user = await User.findOne({ 
    where: { email },
  });
console.log('chegou aqui');
  if (dataValues.userId !== user.id) {
    return { message: 'Unauthorized user' };
  }
  return checkPost;
};

const updateById = async (id, title, content) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  const updatePost = await BlogPost.findOne(
    { 
      where: { id },
      include: [
        { model: User, as: 'user', atributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );
  return updatePost;
};

const deleteById = async (id) => {
  await BlogPost.destroy({
    where: { id },
  });
return { message: 'Post deleted' };
};

const checkCategory = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });
  if (count !== categoryIds.length) {
    return {      
        message: 'one or more "categoryIds" not found',
    };
  }
  return true;
};

module.exports = {
  addPost,
  findAllPosts,
  findById,
  updateById,
  checkUser,
  checkUserPost,
  deleteById,
  checkCategory,
  checkEmail,
};
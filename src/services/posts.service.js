const { map } = require('../app');
const { BlogPost, Category, User } = require('../models');

const addPost= async (dataPost, dataValues) => {
  const { categoryIds } = dataPost;
  const post = await BlogPost.create(
    {
      title: dataPost.title,
      content: dataPost.content,
      userId: dataValues.id,
    },
  );
  const { id } = post.dataValues;

  await BlogPost.bulkCreate(
    categoryIds.map((idValue) => (
      // console.log('===>AQUI', idValue)
      {
        postId: id,
        categoryId: idValue,
      }
    )),
  );
  return post;
};

const checkCategoryExists = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });
  if (count !== categoryIds.length) {
    return {      
        message: 'one or more "categoryIds" not found',            
        message: 'one or more "categoryIds" not found',
    };
  }
  return true;
};

const checkUser = async (dataToken) => {
  const checkEmailUser = await User.findOne({
    where: { email: dataToken },
  });
  return checkEmailUser;
};

module.exports = {
  addPost,
  // findAllPosts,
  checkCategoryExists,
  checkUser,
};
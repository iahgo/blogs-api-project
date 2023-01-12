const postService = require('../services/posts.service');
const { verifyToken } = require('../auth/jwtFunctions');

const addPost = async (req, res) => {
  const dataPost = req.body;
  const { categoryIds } = req.body;
  const dataHeaders = req.headers;
  try {
    const dataCategory = await postService.checkCategoryExists(categoryIds);
    
    if (dataCategory.message) {
      return res.status(400).json(dataCategory);
    }

    if (dataCategory) {
      const dataToken = verifyToken(dataHeaders.authorization);
      const values = await postService.checkUser(dataToken);
      const dataService = await postService.createPost(dataPost, values);
      return res.status(201).json(dataService.dataValues);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
    } 
};

// const findAllPost = async (_req, res) => {
//   const { message } = await postService.findAllPosts();
//   return res.status(200).json(message);
// };

module.exports = {
  addPost,
  // findAllPost,
};
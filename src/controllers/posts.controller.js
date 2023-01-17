const { verifyToken } = require('../auth/jwtFunctions');
const postService = require('../services/posts.service');

const addPost = async (req, res) => {
  const dataPost = req.body;
  const { categoryIds } = req.body;
  const { authorization } = req.headers;

  const categoryExist = await postService.checkCategory(categoryIds);
  if (categoryExist.message) return res.status(400).json(categoryExist);
  
  const token = verifyToken(authorization);
  const email = await postService.checkEmail(token);
  const newPost = await postService.addPost(dataPost, email);
  return res.status(201).json(newPost.dataValues);
};

const findAllPosts = async (_req, res) => {
  const posts = await postService.findAllPosts();
  return res.status(200).json(posts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.findById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message[0]);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { authorization } = req.headers;
  
    const checkPost = await postService.checkUserPost(id);
    if (checkPost.message) return res.status(401).json(checkPost);
  
    const checkUser = await postService.checkUser(authorization, checkPost);
    if (checkUser.message) return res.status(401).json(checkUser);
  
    const updatePost = await postService.updateById(id, title, content);
    return res.status(200).json(updatePost);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const checkPost = await postService.checkUserPost(id);
  if (checkPost.message) return res.status(404).json(checkPost);

  const checkUser = await postService.checkUser(authorization, checkPost);
  if (checkUser.message) return res.status(401).json(checkUser);

  const deletePost = await postService.deleteById(id);
  return res.status(204).json(deletePost);
};

module.exports = {
  addPost,
  findAllPosts,
  findById,
  updateById,
  deleteById,
};

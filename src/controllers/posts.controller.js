const postService = require('../services/posts.service');

// const addUser = async (req, res) => {
//   const { displayName, email, password, image } = req.body;

//   const { type, message } = await postService.addUser(displayName, email, password, image);

//   if (type) return res.status(409).json({ message });

//   return res.status(201).json(message);
// };

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

module.exports = {
  // addUser,
  findAllPosts,
  findById,
  updateById,
};

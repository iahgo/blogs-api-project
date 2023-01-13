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

// const findById = async (req, res) => {
//   const { id } = req.params;
//   const { type, message } = await postService.findById(id);
//   if (type) return res.status(404).json({ message });
//   return res.status(200).json(message);
// };

module.exports = {
  // addUser,
  findAllPosts,
  // findById,
};

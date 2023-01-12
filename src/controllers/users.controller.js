const userService = require('../services/users.service');

const addUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, message } = await userService.addUser(displayName, email, password, image);

  if (type) return res.status(409).json({ message });

  return res.status(201).json(message);
};

const findAllUser = async (_req, res) => {
  const { message } = await userService.findAllUser();
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.findById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  addUser,
  findAllUser,
  findById,
};

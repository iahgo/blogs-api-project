const categoryService = require('../services/categories.service');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const { message } = await categoryService.addCategory({ name });

  return res.status(201).json(message);
};

const findAllCategories = async (_req, res) => {
  const { message } = await categoryService.findAllCategories();
  return res.status(200).json(message);
};

module.exports = {
  addCategory,
  findAllCategories,
};
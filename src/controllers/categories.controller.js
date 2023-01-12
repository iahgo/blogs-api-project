const categoryService = require('../services/categories.service');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const { message } = await categoryService.addCategory({ name });

  return res.status(201).json(message);
};

module.exports = {
  addCategory,
};
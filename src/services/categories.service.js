const { Category } = require('../models');

const addCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return { message: newCategory };
};

const findAllCategories = async () => {
  const users = await Category.findAll();

  return { message: users };
};

module.exports = {
  addCategory,
  findAllCategories,
};
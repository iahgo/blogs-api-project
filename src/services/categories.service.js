const { Category } = require('../models');

const addCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return { message: newCategory };
};

module.exports = {
  addCategory,
};
const express = require('express');
const categoryMiddleware = require('../middlewares/category.middleware.js');
const tokenMiddleware = require('../middlewares/token.middleware.js');
const CategoriesController = require('../controllers/categories.controller');

const route = express.Router();

route.post('/', tokenMiddleware, categoryMiddleware, CategoriesController.addCategory);
// route.get('/', CategoriesController.findAllUser);
// route.get('/:id', CategoriesController.findById);

module.exports = route;

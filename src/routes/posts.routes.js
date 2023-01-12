const express = require('express');
const tokenMiddleware = require('../middlewares/token.middleware.js');
const postsController = require('../controllers/posts.controller');

const route = express.Router();

route.post('/',  postsController.addPost);
// route.get('/', tokenMiddleware, postsController.findAllCategories);

module.exports = route;

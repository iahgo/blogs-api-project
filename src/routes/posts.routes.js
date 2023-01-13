const express = require('express');
const tokenMiddleware = require('../middlewares/token.middleware.js');
const postController = require('../controllers/posts.controller');

const route = express.Router();

// route.post('/', tokenMiddleware, postController.addUser);
route.get('/', tokenMiddleware, postController.findAllPosts);
route.get('/:id', tokenMiddleware, postController.findById);

module.exports = route;

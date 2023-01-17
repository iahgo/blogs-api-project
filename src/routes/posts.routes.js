const express = require('express');
const tokenMiddleware = require('../middlewares/token.middleware.js');
const updateMiddleware = require('../middlewares/post.middleware.js');
const postController = require('../controllers/posts.controller');

const route = express.Router();

// route.post('/', tokenMiddleware, postController.addUser);
route.get('/', tokenMiddleware, postController.findAllPosts);
route.get('/:id', tokenMiddleware, postController.findById);

// route.put('/:id', postController.updateById);
route.put('/:id', updateMiddleware, tokenMiddleware, postController.updateById);

module.exports = route;

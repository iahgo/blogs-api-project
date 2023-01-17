const express = require('express');
const tokenMiddleware = require('../middlewares/token.middleware.js');
const middlewares = require('../middlewares/post.middleware.js');
const postController = require('../controllers/posts.controller');

const route = express.Router();

// route.post('/', tokenMiddleware, postController.addUser);
route.get('/', tokenMiddleware, postController.findAllPosts);
route.get('/:id', tokenMiddleware, postController.findById);
// route.post('/', tokenMiddleware, middlewares.postMiddleware, postController.addPost);
route.post('/', tokenMiddleware, middlewares.postMiddleware, postController.addPost);

// route.put('/:id', postController.updateById);
route.put('/:id', middlewares.updateMiddleware, tokenMiddleware, postController.updateById);
route.delete('/:id', tokenMiddleware, postController.deleteById);

module.exports = route;

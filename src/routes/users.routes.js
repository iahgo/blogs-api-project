const express = require('express');
const userMiddleware = require('../middlewares/user.middleware');
const tokenMiddleware = require('../middlewares/token.middleware.js');
const userController = require('../controllers/users.controller');

const route = express.Router();

route.post('/', userMiddleware, userController.addUser);
route.get('/', tokenMiddleware, userController.findAllUser);

module.exports = route;

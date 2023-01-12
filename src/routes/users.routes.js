const express = require('express');
const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/users.controller');

const route = express.Router();

route.post('/', userMiddleware, userController.addUser);

module.exports = route;

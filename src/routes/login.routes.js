const express = require('express');
const loginController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.middleware');

const route = express.Router();

route.post('/', loginMiddleware, loginController.login);

module.exports = route;

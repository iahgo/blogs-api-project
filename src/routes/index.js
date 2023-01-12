const express = require('express');
const loginRoutes = require('./login.routes');
const usersRoutes = require('./users.routes');
const categoriesRoutes = require('./categories.routes');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/user', usersRoutes);
routes.use('/categories', categoriesRoutes);

module.exports = routes;
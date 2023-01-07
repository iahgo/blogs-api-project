const express = require('express');
const usersRoutes = require('./users.routes');

const routes = express.Router();

routes.use(usersRoutes);

module.exports = routes;
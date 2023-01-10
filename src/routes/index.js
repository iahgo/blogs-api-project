const express = require('express');
// const usersRoutes = require('./users.routes');
const loginRoutes = require('./login.routes');

const routes = express.Router();

routes.use('/login', loginRoutes);
// routes.use(usersRoutes);

module.exports = routes;
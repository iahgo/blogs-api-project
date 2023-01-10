const express = require('express');
// const { productsController, salesController } = require('../controllers/index');
// const validateName = require('../middlewares/validateName');
// const validateProductId = require('../middlewares/validateProductId');
// const validateQuantity = require('../middlewares/validateQuantity');
const loginController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.middleware');

const route = express.Router();

// route.get('/products', productsController.findAllProducts);
route.post('/', loginMiddleware, loginController.login);
// route.put('/products/:id', validateName, productsController.updateProduct);
// route.delete('/products/:id', productsController.deleteProduct);

// route.get('/user');
// route.get('/sales/:id', salesController.findSaleById);

module.exports = route;

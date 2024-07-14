const express = require('express');
const { getProduct, getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', getProducts)

productRouter.get('/:id', getProduct)

productRouter.post('/', createProduct)

productRouter.put('/:id', updateProduct)

productRouter.delete('/:id', deleteProduct)

module.exports = productRouter;